const express = require("express");
const router = express.Router();
const port = process.env.PORT || 8080;

const data = () => {
    fetch('https://reference.intellisense.io/thickenernn/v1/referencia')
      .then((res) => res.json())
      .then((res) => setEquipmentData(res.current.data.TK1));
  };

router.all("/backend", (req, res) => {
    res.send(data);
});

module.exports = router;