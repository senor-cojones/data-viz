const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
var path = require('path');

app.use(express.static(path.join(__dirname, "client", "build")));

const data = () => {
    fetch("https://reference.intellisense.io/thickenernn/v1/referencia")
        .then((response) => response.json())
        .then((response) => {
            const tk1Data = response.current.data.TK1;

            const filteredData = Object.entries(tk1Data)
                .filter(([key]) => key.startsWith("TK1_"))
                .reduce((obj, [key, value]) => {
                    obj[key] = value;

                    return obj;
                }, {});

            setEquipmentData(filteredData);
        });
};

router.all("/backend", (req, res) => {
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

module.exports = router;
