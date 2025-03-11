"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeClosed } from "lucide-react";

const PasswordInput = ({
  placeholder,
  field,
  name,
}: {
  placeholder: string;
  field?: any;
  name: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex border-2 rounded-lg outline-none ">
      <Input
        placeholder={placeholder}
        name={name}
        type={show ? "text" : "password"}
        className="border-none outline-none"
        {...field}
      />

      <Button
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
        variant="secondary"
        className="bg-white dark:bg-black hover:bg-none"
      >
        <div className="text-black dark:text-white">
          {show ? <EyeClosed /> : <Eye />}
        </div>
      </Button>
    </div>
  );
};

export default PasswordInput;
