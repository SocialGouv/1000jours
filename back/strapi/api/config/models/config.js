"use strict";

const ConfigService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (config) => config.map(ConfigService.format),
  },
};
