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
      <div className="border px-4 py-8 rounded-lg w-full max-w-sm">
        <h1 className="text-center">Sign Up</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <CustomFormField
              name="name"
              className="w-full"
              control={form.control}
              formLabel="Name"
              description="Enter your name"
              render={({ field }) => (
                <Input placeholder="John Doe" name="name" {...field} />
              )}
            />

            <CustomFormField
              name="email"
              className="w-full"
              control={form.control}
              formLabel="Name"
              description="Enter your name"
              render={({ field }) => (
                <Input placeholder="user@example.com" name="email" {...field} />
              )}
            />

            <CustomFormField
              name="password"
              className="w-full"
              control={form.control}
              formLabel="Name"
              description="Enter your name"
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
      </div>
    </div>
  );
};

export default SignUppage;
