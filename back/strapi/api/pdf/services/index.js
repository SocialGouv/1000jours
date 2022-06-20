const html_to_pdf = require('html-pdf-node');
const path = require('path');

const relativeDirPath = path.relative(".", `public`);

const createPdf = (filename, content = "ND") => {
  const options = {
    format: "A4",
    margin: {
      bottom: 25,
      left: 25,
      right: 25,
      top: 25,
    },
    path: relativeDirPath + "/" + filename,
  };

  const file = {
    content: content,
  };

  return html_to_pdf.generatePdf(file, options);
};

module.exports = { createPdf };
