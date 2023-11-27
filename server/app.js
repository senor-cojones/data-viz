const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server started"));

app.get('/backend', (req, res) => {
  res.send({ express: "Express connected to React" });
});