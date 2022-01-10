// Script to generate english-vietnamese translation JSON file

const fs = require("fs");
const csv = require("csv-parser");

var vietnamese_sentences = {};
var english_sentences = {};

fs.createReadStream("../")
  .pipe(csv())
  .on("data", function (data) {
    try {
      const sentences_data = data[Object.keys(data)[0]];
      const sentences_data_split = sentences_data.split("\t");

      const id = sentences_data_split[0];
      const language = sentences_data_split[1];
      const sentence = sentences_data_split[2];

      // storing vietnamese sentences
      if (language == "vie") {
        vietnamese_sentences[id] = sentence;
        console.log("Vietnamese sentence added");
      }

      // storing english sentences
      if (language == "eng") {
        english_sentences[id] = sentence;
        console.log("English sentence added");
      }

      //perform the operation
    } catch (err) {
      //error handler
      console.log(err);
    }
  });
