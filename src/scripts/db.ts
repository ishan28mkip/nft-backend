import * as dotenv from "dotenv";
dotenv.config();

import { connect } from "mongoose";
import mongoose from "mongoose";
import fs from "fs";

import { TranslationModel } from "../models/translations";

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  //   MongoDB connection
  const connection = await connect(
    "mongodb+srv://translations:vietnam@cluster0.qdrc1.mongodb.net/translations?retryWrites=true&w=majority"
  );
  console.log("DB connected");
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
          console.log("Current Data Written");
          connection.disconnect();
          console.log("DB disconnected");
        });
      }
    );
  });
}
