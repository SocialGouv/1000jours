const slugify = require("slugify");

const slugLower = (...strs) => slugify(strs.join(" "), { lower: true });

module.exports = { slugLower };
