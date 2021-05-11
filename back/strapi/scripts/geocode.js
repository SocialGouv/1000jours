const { createGeocodeStream: streamGeocode } = require("addok-geocode-stream");

const SERVICE_URL = "https://api-adresse.data.gouv.fr";

const main = () =>
  new Promise((resolve, reject) => {
    const stream = streamGeocode(SERVICE_URL, {
      columns: ['address'],
      bucketSize: 100,
    });

    stream
      .on("data", (data) => {
        console.log({ data });
      })
      .on("error", reject)
      .on("finish", resolve);

    stream.write({ address: "AVENUE JEAN HAMEAU Teste-de-Buch" });
    stream.write({ address: "aosifnqoei nq314106y4h08 asmsgiggegqeipngipengpiengpieqngpiqe" });
    stream.end();
  });

main().catch(console.error);
