module.exports = {
  settings: {
    parser: {
      enabled: true,
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // 1 gb
      },
      multipart: true,
    },
  },
};
