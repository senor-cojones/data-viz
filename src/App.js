import React, { useState } from "react";
import "./reset.css";
import "./App.css";

const App = () => {
    const [equipmentData, setEquipmentData] = useState();

    //Fetch data from express server and save it in state
    const getData = () => {
        // fetch("/backend")
        fetch("https://reference.intellisense.io/thickenernn/v1/referencia")
            .then((res) => res.json())
            .then((res) => setEquipmentData(res.current.data.TK1));

        logData(equipmentData);
    };

    const logData = () => {
        let rows = [];

        if (equipmentData) {
            //Filter out all of the keys starting with TK1_
            const equipmentKeys = Object.keys(equipmentData).filter((v) =>
                v.startsWith("TK1_")
            );

            equipmentKeys.forEach((equipmentKey) => {
                const equipmentValues = equipmentData[equipmentKey].values;

                rows.push(
                    <tr key={equipmentKey}>
                        <td>{equipmentKey}</td>
                        <td>{equipmentValues[equipmentValues.length - 1]}</td>
                    </tr>
                );
            });
        } else {
            rows = (
                <tr>
                    <td>No data to report</td>
                </tr>
            );
        }

        return rows;
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
                <tbody>{logData()}</tbody>
            </table>
        </div>
    );
};

export default App;
