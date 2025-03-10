import { Schema } from "mongoose";

export interface IResume extends Document {
  userId: Schema.Types.ObjectId;
  fileUrl: string;
  parsedText: string;
  atsScore: number;
  suggestions: string[];
  extractedSkills: string[];
}

export const ResumeSchema: Schema<IResume> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String },
    parsedText: { type: String },
    atsScore: { type: Number },
    suggestions: [String],
    extractedSkills: [String],
  },
  {
    timestamps: true,
  }
);
