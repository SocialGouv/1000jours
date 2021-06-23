const slugify = require("slugify");

const slugLower = (...strs) =>
  slugify(strs.join(" "), {
    lower: true,
    remove: /[*+~.()'"!:@]/,
  });

const trimObjectFields = (attributes, data) =>
  Object.keys(attributes).forEach((key) => {
    if (data[key] && attributes[key].type === "string") {
      data[key] = data[key].trim();
    }
  });

const hex = "012345678abcdef";

const randomHash = (length = 8) =>
  [...new Array(length)]
    .map(() => hex[Math.floor(Math.random() * 16)])
    .join("");

module.exports = {
  slugLower,
  trimObjectFields,
  randomHash,
};
