const formatPoiFromData = (source, entity) => {
  if (entity.code_postal && entity.code_postal.length < 5) {
    entity.code_postal = entity.code_postal.padStart(5, "0");
  }

  for (const key of ["position_longitude", "position_latitude"]) {
    // TODO: transform based on pois actual types
    if (entity[key]) {
      const n = parseFloat(entity[key]);

      entity[key] = !isNaN(n) ? n : null;
    }
  }
};

module.exports = {
  formatPoiFromData,
};
