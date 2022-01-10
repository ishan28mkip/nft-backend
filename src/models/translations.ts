import { Schema, model } from "mongoose";

// Interface representing a document in MongoDB
interface Translation {
  englishID: string;
  englishSentence: string;
  englishURL: string;
  vietnameseID: string;
  vietnameseSentence: string;
}

// Schema corresponding to the document interface
const schema = new Schema<Translation>({
  englishID: { type: String, required: true },
  englishSentence: { type: String, required: true },
  englishURL: { type: String, required: true },
  vietnameseID: { type: String, required: true },
  vietnameseSentence: { type: String, required: true },
});

// Model
export const TranslationModel = model<Translation>("Translation", schema);
