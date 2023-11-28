import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [equipmentData, setEquipmentData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("https://reference.intellisense.io/thickenernn/v1/referencia")
            .then((res) => res.json())
            .then((res) => setEquipmentData(res.current.data.TK1));

        logData(equipmentData);
    };

    const logData = (equipmentData) => {
        const equipmentKeys = Object.keys(equipmentData)
            .filter((v) => v.startsWith("TK1_"))

            equipmentKeys.forEach(key => {
                console.log(key);
                console.log(equipmentData[key].values[equipmentData[key].values.length - 1])
            });
    };

    return (
        <div>
            <h1>Predicted Future Operation Data</h1>
            <button onClick={getData}>Get Data</button>
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                {/* <tbody>{logData}</tbody> */}
            </table>
        </div>
    );
};

export default App;
