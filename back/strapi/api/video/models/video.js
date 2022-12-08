"use strict";

const VideoService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (videos) => videos.map(VideoService.format),
    afterFindOne: VideoService.format,
    beforeCreate: async (data) => VideoService.sanitizeTexts(data),
    beforeUpdate: async (params, data) => VideoService.sanitizeTexts(data),
  },
};
