"use server";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import ResumeModel from "@/models/ResumeModel";
import UserModel from "@/models/UserModel";
import { v2 as cloudinary } from "cloudinary";
import { toast } from "sonner";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadResume = async (data: FormData) => {
  await dbConnect();
  const session = await auth();
  try {
    const user = await UserModel.findOne({ email: session?.user?.email });

    if (!user) {
    }

    const file = data.get("file") as File;

    const filename = file.name as string;

    const filebuffer = await file.arrayBuffer();
    const fileBase64 = Buffer.from(filebuffer).toString("base64");
    const fileData = `data:${file.type};base64,${fileBase64}`;

    const resume = cloudinary.uploader.upload(fileData, {
      folder: "resumes",
      resource_type: "raw",
      format: file.type.split("/")[1],
    });

    const fileUrl = (await resume).secure_url;

    const uploadResume = await ResumeModel.create({
      userId: user?._id,
      fileUrl: fileUrl,
      filename: filename,
    });

    console.log(uploadResume, file.name, session?.user?.email);

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

    const resumes = await ResumeModel.find({ userId: user?._id });

    return JSON.parse(JSON.stringify(resumes));
  } catch (error) {
    throw new Error(`Error in getResume: ${JSON.stringify(error)}`);
  }
};
