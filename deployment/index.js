const cors = require("cors");
const express = require("express");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.redirect("http://localhost:19002/");
});

app.get("/healthz", (req, res) => {
    res.send("OK");
});

app.listen(3000, () => {
    console.log(`Server started on port ${3000}`);
});
