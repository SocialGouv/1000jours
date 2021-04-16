"use strict";

const sanitizeArticle = (data) => {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim().replace(/(\s)+/g, "$1");
    }
  });
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => sanitizeArticle(data),
    beforeUpdate: async (params, data) => sanitizeArticle(data),
  },
};
