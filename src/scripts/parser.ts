// Script to generate english-vietnamese translation JSON file

import fs from "fs";
import csv from "csv-parser";

/**
 * Assuming sentences file in N in size, sentences_with_audio is M in size
 * and links is P in size
 */

const vietnamese_sentences = {};
const english_sentences = {};

fs.createReadStream("../../data/sentences.csv")
  .pipe(csv())
  /**
   * Read the sentences to separate the English and Vietnamese
   * sentences and put them in an object which will act as a
   * hash map
   */
  /**
   * O(N)
   */
  .on("data", function (data) {
    try {
      const sentences_data = data[Object.keys(data)[0]];
      const sentences_data_split = sentences_data.split("\t");

      const id = sentences_data_split[0];
      const language = sentences_data_split[1];
      const sentence = sentences_data_split[2];

      /**
       * Storing vietnamese sentences in hash map
       */
      if (language == "vie") {
        vietnamese_sentences[id] = sentence;
      }

      /**
       * Storing english sentences in hash map
       */
      if (language == "eng") {
        english_sentences[id] = sentence;
      }
    } catch (err) {
      console.log(err);
    }
  })
  .on("end", function () {
    /**
     * Test writing the vietnamese english translation files
     */
    // fs.writeFile(
    //   "../../processed-data/vietnamese.json",
    //   JSON.stringify(vietnamese_sentences, null, 4),
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //   }
    // );
    // fs.writeFile(
    //   "../../processed-data/english.json",
    //   JSON.stringify(english_sentences, null, 4),
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //   }
    // );

    /**
     * Create sets of both english and vietnamese to test whether a
     * link id is english or vietnamese sentence in O(1)
     */
    const english_set = new Set(Object.keys(english_sentences));
    const vietnamese_set = new Set(Object.keys(vietnamese_sentences));

    /**
     * Read the sentence audio file
     */
    const sentence_with_audio = {};
    fs.createReadStream("../../data/sentences_with_audio.csv")
      .pipe(csv())
      /**
       * O(M)
       */
      .on("data", function (data) {
        try {
          const audio_data = data[Object.keys(data)[0]];
          const audio_data_split = audio_data.split("\t");
          const audio_data_id = audio_data_split[0];
          const audio_data_URL = audio_data_split[3];
          /**
           * Only add english audio URL
           */
          if (english_set.has(audio_data_id)) {
            /**
             * URL always starts with http
             */
            if (
              audio_data_URL &&
              audio_data_URL.length >= 4 &&
              audio_data_URL.substring(0, 4) === "http"
            ) {
              sentence_with_audio[audio_data_id] = audio_data_URL;
            }
          }
        } catch (err) {
          console.log(err);
        }
      })

      .on("end", function () {
        /**
         * Test writing the audio english URL files
         */
        // fs.writeFile(
        //   "../../processed-data/audio.json",
        //   JSON.stringify(sentence_with_audio, null, 4),
        //   (err) => {
        //     if (err) {
        //       console.error(err);
        //       return;
        //     }
        //   }
        // );
        const translations = [];
        let record_number = 0;
        fs.createReadStream("../../data/links.csv")
          .pipe(csv())
          /**
           * O(P)
           */
          .on("data", function (data) {
            const links_data = data[Object.keys(data)[0]];
            const links_data_split = links_data.split("\t");
            const id1 = links_data_split[0];
            const id2 = links_data_split[1];
            /**
             * Check for only english to vietnamese translations
             */
            // O(1)
            if (english_set.has(id1) && vietnamese_set.has(id2)) {
              const englishURL = sentence_with_audio[id1] || "";
              translations.push({
                englishID: id1,
                // O(1)
                englishSentence: english_sentences[id1],
                englishURL,
                vietnameseID: id2,
                // O(1)
                vietnameseSentence: vietnamese_sentences[id2],
              });
            }
          })
          .on("end", function () {
            /**
             * Test writing the final translations
             */
            fs.writeFile(
              "../../processed-data/translations.json",
              JSON.stringify(translations, null, 4),
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
          });
      });
  });

// Total complexity is O(N+M+P)
/**
 * Improvements that can be done:
 * Don't load all files in memory and use chunking and distributed search
 * will increase complexity but reduce memory requirements
 */
