"use strict";

const QuestionnaireTnd = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (videos) => videos.map(QuestionnaireTnd.format),
    afterFindOne: QuestionnaireTnd.format,
  },
};
