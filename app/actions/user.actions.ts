"use server";

import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
  await dbConnect();
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await UserModel.findOne({ email: email });

    if (user) {
      Response.json(
        { success: false, message: "User already exists" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    redirect("/sign-in");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
