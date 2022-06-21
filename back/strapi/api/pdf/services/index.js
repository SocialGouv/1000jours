const html_to_pdf = require('html-pdf-node');
const path = require('path');

const relativeDirPath = path.relative(".", "public");

const createPdf = (filename, content = "ND") => {
  const options = {
    format: "A4",
    margin: {
      bottom: 25,
      left: 25,
      right: 25,
      top: 25,
    },
    path: path.join(relativeDirPath, filename),
  };

  const file = {
    content,
  };

  return html_to_pdf.generatePdf(file, options);
};

module.exports = { createPdf };
