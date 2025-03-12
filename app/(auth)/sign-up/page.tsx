"use client";

import PasswordInput from "@/components/shared/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "@/components/shared/FormField";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignUppage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/sign-up", data);

      const result = await response.data;

      return result;
    } catch (error) {
      const axiosError = error as AxiosError;

      const errorMessage = axiosError.response?.data;

      toast("Error while signup", {
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <div className="flex min-h-svh justify-center items-center">
      <div className="flex flex-col border px-4 py-8 rounded-lg w-full mx-4 max-w-sm shadow-sm">
        <div className="flex flex-col items-center w-full justify-center gap-4 mb-4">
          <h1 className="text-center font-semibold text-2xl">
            Sign Up with ResumeAI
          </h1>
          <p className="text-sm text-gray-700 dark:text-white">
            Welcome! Please fill in the details to get started
          </p>
          <div className="flex w-full justify-center items-center gap-2">
            <button
              className="flex w-full gap-2 justify-center items-center rounded-sm border px-2 py-1 shadow-sm font-semibold"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Google
              <FcGoogle />
            </button>
            <button
              className="flex w-full gap-2 justify-center items-center border rounded-sm px-2 py-1 shadow-sm font-semibold"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              Github
              <FaGithub />
            </button>
          </div>
          <div className="flex justify-center w-full gap-2 items-center">
            <hr className="w-full" />
            or
            <hr className="w-full" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-4"
            >
              <CustomFormField
                name="name"
                className="w-full"
                control={form.control}
                formLabel="Name"
                render={({ field }) => (
                  <Input placeholder="John Doe" name="name" {...field} />
                )}
              />

              <CustomFormField
                name="email"
                className="w-full"
                control={form.control}
                formLabel="Email"
                render={({ field }) => (
                  <Input
                    placeholder="user@example.com"
                    name="email"
                    {...field}
                  />
                )}
              />

              <CustomFormField
                name="password"
                className="w-full"
                control={form.control}
                formLabel="Password"
                render={({ field }) => (
                  <PasswordInput
                    name="password"
                    placeholder="Enter your password"
                    field={field}
                  />
                )}
              />

              <Button type="submit">Sign Up</Button>
            </form>
          </Form>
          <p className="text-center mt-4 text-sm text-gray-700 dark:text-white">
            Already have an account?
            <a
              href="/sign-in"
              className="underline hover:text-black dark:hover:text-gray-400"
            >
              signin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUppage;
