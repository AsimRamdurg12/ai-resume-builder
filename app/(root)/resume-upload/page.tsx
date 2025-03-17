"use client";

import { uploadResume } from "@/app/actions/resume.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IResume } from "@/models/ResumeModel";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ResumeUploadPage = () => {
  const [file, setFile] = useState<File[]>([]);
  const [resumes, setResumes] = useState<IResume>([]);
  const [checked, setChecked] = useState(false);

  const onDrop = useCallback((acceptFiles: any) => {
    console.log(acceptFiles);
    setFile(acceptFiles);
  }, []);

  const handleForm = useCallback(async (formdata: FormData) => {
    const response = await uploadResume(formdata);

    setResumes(response);
    console.log(response);

    setFile([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "	application/msword": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="flex mt-20 flex-col items-center mx-auto max-w-6xl">
      <h1 className="font-bold text-3xl sm:text-4xl mb-10">Upload Resume</h1>
      <form action={handleForm} className="flex flex-col gap-4 w-full">
        <div
          {...getRootProps()}
          className="mx-4 p-20 flex justify-center border-dashed border dark:border-white border-gray-700"
        >
          <input {...getInputProps({ name: "file" })} />
          {file[0] ? (
            <p>{file[0]?.name}</p>
          ) : isDragActive ? (
            <p>Drop the resume here</p>
          ) : (
            <p>Drag and drop your resume here, or click to upload resume</p>
          )}
        </div>

        {file.length !== 0 && (
          <div className="flex flex-col mx-4 gap-4">
            <div className="flex gap-2 ">
              <Input
                type="checkbox"
                className="size-6"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <p>Job Description</p>
            </div>
            {checked && (
              <>
                <Label>Job Description</Label>
                <textarea
                  name="jobdescription"
                  className="border rounded-lg p-4"
                  cols={30}
                  rows={10}
                ></textarea>
              </>
            )}
          </div>
        )}
        <Button
          type="submit"
          disabled={file.length === 0}
          className="mx-4 flex justify-center"
        >
          Submit
        </Button>
      </form>

      {resumes.atsScore && (
        <div className="flex flex-col gap-4 border mt-10 mx-4 px-4 py-2">
          <h2>Your Resume Score</h2>

          <p>
            Resume: <span>{resumes?.filename}</span>
          </p>

          <p>{resumes?.atsScore}</p>

          <Button>
            <Link href={`/analysis/${resumes._id}`}>Analyze</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPage;
