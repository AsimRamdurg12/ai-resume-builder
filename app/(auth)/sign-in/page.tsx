"use client";

import CustomFormField from "@/components/shared/FormField";
import PasswordInput from "@/components/shared/PasswordInput";
import { FormSchema } from "@/schemas/FormSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const SignInpage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error === "CredentialsSignin") {
        toast("Login Failed", {
          description: "Invalid email or password",
        });
      } else {
        toast(response?.error);
      }

      if (response?.url) {
        toast("Login Successful");
        router.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      toast("Login Failed", {
        description: `${error}`,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh justify-center items-center">
      <div className="border px-4 py-8 rounded-lg w-full max-w-sm mx-4">
        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <h1 className="text-center font-semibold text-2xl">
            Sign In with ResumeAI
          </h1>
          <p className="text-sm text-gray-700 dark:text-white">
            Welcome back! please sign in to continue
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
                name="email"
                control={form.control}
                formLabel="Email"
                description="Enter your valid Email"
                className="w-full"
                render={({ field }) => (
                  <Input placeholder="user@example.com" {...field} />
                )}
              />
              <CustomFormField
                name="password"
                formLabel="Password"
                className="w-full"
                control={form.control}
                render={({ field }) => (
                  <PasswordInput
                    name="password"
                    placeholder="Enter your password"
                    field={field}
                  />
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
            </form>
          </Form>
          <p className="text-center mt-4 text-sm text-gray-700 dark:text-white">
            Don&apos;t have an account?
            <a
              href="/sign-up"
              className="underline hover:text-black dark:hover:text-gray-400"
            >
              signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInpage;
