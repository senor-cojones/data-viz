const express = require("express");
const router = express.Router();
const port = process.env.PORT || 8080;

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = router;
