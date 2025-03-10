import { model, Model, models, Schema } from "mongoose";
import { IResume, ResumeSchema } from "./ResumeModel";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  resumes: IResume[];
}

export const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    resumes: [ResumeSchema],
  },
  { timestamps: true }
);

const UserModel =
  (models?.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default UserModel;
