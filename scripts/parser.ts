// script to generate english-vietnamese translation csv file

const fs = require("fs");
const csv = require("csv-parser");

var vietnamese_sentences = {};
var english_sentences = {};

// local cache
// var data=fs.readFileSync('/home/pallav/Desktop/ishan/vietnamese.json', 'utf8');
// vietnamese_sentences=JSON.parse(data);

// var data2=fs.readFileSync('/home/pallav/Desktop/ishan/english.json', 'utf8');
// english_sentences=JSON.parse(data2);

fs.createReadStream("/home/pallav/Desktop/ishan/public/data/sentences.csv")
  .pipe(csv())
  .on("data", function (data) {});
