const fs = require("fs");
const isoConv = require("iso-language-converter");

const getFiles = (path) => {
  return fs
    .readdirSync(`./resources/tesseract/${path}`)
    .filter((e) => e.endsWith(".traineddata"))
    .filter((e) => !e.includes("_old"))
    .sort()
    .map((e) => {
      const id = e.split(".")[0];
      return {
        id: id,
        name: isoConv(id) ?? id,
      };
    });
};

fs.writeFileSync(
  "./resources/tesseract/tessdata.json",
  JSON.stringify({
    tessdata_best: getFiles("tessdata_best-4.1.0"),
    tessdata_fast: getFiles("tessdata_fast-4.1.0"),
    tessdata: getFiles("tessdata-4.1.0"),
  })
);
