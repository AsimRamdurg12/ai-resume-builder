import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, email, password } = await request.json();

    const userEmail = await UserModel.findOne({ email: email });

    if (userEmail) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `Error in sign-up route: ${error}`,
      },
      { status: 500 }
    );
  }
}
