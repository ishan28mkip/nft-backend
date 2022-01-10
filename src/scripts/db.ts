import * as dotenv from "dotenv";
dotenv.config();

import { Schema, model, connect } from "mongoose";
import mongoose from "mongoose";
import fs from "fs";

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
const TranslationModel = model<Translation>("Translation", schema);

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  //   MongoDB connection
  const connection = await connect("mongodb://localhost:27017/translations");
  mongoose.connection.collections["translations"].drop(function (err) {
    console.log("Previous data dropped");
    fs.readFile(
      "../../processed-data/translations.json",
      "utf8",
      function (err, data) {
        if (err) console.log(err);
        const translations = JSON.parse(data);
        TranslationModel.collection.insertMany(translations, function (err, r) {
          if (err) console.log(err);
          connection.disconnect();
        });
      }
    );
  });
}
