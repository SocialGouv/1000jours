"use strict";

const QuestionnaireTnd = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (questionnaireTnds) =>
      questionnaireTnds.map(QuestionnaireTnd.format),
    afterFindOne: QuestionnaireTnd.format,
  },
};
