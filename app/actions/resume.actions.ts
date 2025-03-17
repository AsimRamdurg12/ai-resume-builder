"use server";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import ResumeModel from "@/models/ResumeModel";
import UserModel from "@/models/UserModel";
import { v2 as cloudinary } from "cloudinary";
import { toast } from "sonner";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadResume = async (data: FormData) => {
  await dbConnect();
  try {
    const session = await auth();
    const user = await UserModel.findOne({ email: session?.user?.email });

    const file = data.get("file") as File;

    const filename = file.name as string;

    const filebuffer = await file.arrayBuffer();
    const filebufferdata = Buffer.from(filebuffer);
    const fileData = `data:${file.type};base64,${filebufferdata.toString(
      "base64"
    )}`;

    let fileText;

    if (file.type === "application/pdf") {
      const pdfData = await pdfParse(filebufferdata);
      fileText = pdfData.text;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const wordData = await mammoth.extractRawText({ buffer: filebufferdata });

      fileText = wordData.value;
    }

    const jobDescription = data.get("jobdescription") as string;

    let prompt = `Analyze this resume's ATS friendliness based on the following criteria:
      - Formatting (avoid tables, graphics, and columns)
      - Keyword relevance for job applications
      - Readability for ATS
      - Section structure (Education, Experience, Skills, etc.)

      Analyze the following resume and provide only the ATS score as a number (0-100).Do NOT include any text, just the number.
      Resume Text:
      ${fileText}`;

    if (jobDescription) {
      prompt += ` Compare this resume with the following job description and suggest optimizations:

        Job Description:
        ${jobDescription}
      `;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are an ATS scoring assistant." },
        { role: "user", content: prompt },
      ],
    });

    const atsScore =
      response.choices[0]?.message?.content || "failed to calculate ATS score";

    const resume = cloudinary.uploader.upload(fileData, {
      folder: "resumes",
      resource_type: "raw",
      format: file.type.split("/")[1],
    });

    const fileUrl = (await resume).secure_url;

    const uploadResume = await ResumeModel.create({
      userId: user?.email,
      fileUrl: fileUrl,
      filename: filename,
      parsedText: fileText,
      atsScore: atsScore,
    });

    return JSON.parse(JSON.stringify(uploadResume));
  } catch (error) {
    throw new Error(`Error in uploadResume: ${JSON.stringify(error)}`);
  }
};

export const getResumes = async () => {
  await dbConnect();
  const session = await auth();

  try {
    if (!session || !session.user) {
      toast("Please login");
    }

    const user = await UserModel.findOne({ email: session?.user?.email });

    const resumes = await ResumeModel.find({ userId: user?.email });

    return JSON.parse(JSON.stringify(resumes));
  } catch (error) {
    throw new Error(`Error in getResume: ${JSON.stringify(error)}`);
  }
};

export const getResumesById = async (id: string) => {
  await dbConnect();
  const session = await auth();

  try {
    if (!session || !session.user) {
      toast("Please login");
    }

    const user = await UserModel.findOne({ email: session?.user?.email });
  } catch (error) {
    throw new Error(`Error in getResumesbyId: ${JSON.stringify(error)}`);
  }
};
