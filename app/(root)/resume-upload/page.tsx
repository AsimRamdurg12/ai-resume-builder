"use client";

import { uploadResume } from "@/app/actions/resume.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

const ResumeUploadPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-svh mx-auto max-w-6xl">
      <div
        className="flex flex-col justify-center text-gray-900 items-center px-4 py-2 border w-xl mx-auto rounded-md"
        onClick={handleClick}
      >
        <UploadCloud className="size-2/3 opacity-50" />
        Upload your resume .pdf/.docx
      </div>

      <form
        action={uploadResume}
        encType="multipart/form-data"
        className="relative mx-4"
      >
        <Input
          type="file"
          accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
          name="file"
          className="opacity-0"
          ref={inputRef}
        />
        <p>{inputRef.current?.value}</p>
        <Button type="submit" className="border w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResumeUploadPage;
