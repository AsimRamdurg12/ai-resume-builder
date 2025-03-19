import { model, Model, models, Schema } from "mongoose";

export interface IResume extends Document {
  userId: string;
  fileUrl: string;
  filename: string;
  parsedText: string;
  atsScore: number;
  suggestions: string;
  extractedSkills: string[];
}

export const ResumeSchema: Schema<IResume> = new Schema(
  {
    userId: { type: String },
    fileUrl: { type: String },
    filename: { type: String },
    parsedText: { type: String },
    atsScore: { type: Number },
    suggestions: { type: String },
    extractedSkills: [String],
  },
  {
    timestamps: true,
  }
);

const ResumeModel =
  (models?.Resume as Model<IResume>) || model<IResume>("Resume", ResumeSchema);

export default ResumeModel;
