const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () =>
    console.log(`Server started. Listening on port ${port}`)
);

const data = () => {
    fetch('https://reference.intellisense.io/thickenernn/v1/referencia')
      .then((res) => res.json())
      .then((res) => setEquipmentData(res.current.data.TK1));
  };

app.all("/backend", (req, res) => {
    res.send(data);
});
