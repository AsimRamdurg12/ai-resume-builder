"use client";

import { uploadResume } from "@/app/actions/resume.actions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ResumeUploadPage = () => {
  const [file, setFile] = useState([]);

  const { data: session } = useSession();

  console.log(session?.user);

  const onDrop = useCallback((acceptFiles: any) => {
    console.log(acceptFiles);
    setFile(acceptFiles);
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
    <div className="flex mt-20 flex-col items-center min-h-svh mx-auto max-w-6xl">
      <h1 className="font-bold text-3xl sm:text-4xl mb-10">Upload Resume</h1>
      <form action={uploadResume} className="flex flex-col gap-4 w-full">
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
        <Button type="submit" disabled={file.length === 0} className="mx-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResumeUploadPage;
