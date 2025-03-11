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

const SignInpage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        entries: { email: data.email, password: data.password },
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
    } catch (error) {
      toast("Login Failed", {
        description: `${error}`,
      });
    }
  };

  return (
    <div className="flex min-h-svh justify-center items-center">
      <div className="border px-4 py-8 rounded-lg w-full max-w-sm md:max-w-3xl">
        <h1 className="text-center">Sign In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
                  placeholder="Enter your password"
                  field={field}
                />
              )}
            />
            <Button type="submit">Sign in</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInpage;
