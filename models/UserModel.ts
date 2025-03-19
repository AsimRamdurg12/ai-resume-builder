import mongoose, { model, Model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  resumes: Schema.Types.ObjectId[];
}

export const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    image: { type: String },
    resumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],
  },
  { timestamps: true }
);

const UserModel =
  (models?.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default UserModel;
