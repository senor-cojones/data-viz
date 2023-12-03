import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./reset.css";
import "./App.css";

function App() {
    const [equipmentData, setEquipmentData] = useState({});

    const getData = () => {
        // fetch("/backend")
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

    const logData = () => {
        return Object.entries(equipmentData).map(([key, value]) => (
            <tr key={key}>
                <td>{key}</td>
                <td>{value.values[value.values.length - 1]}</td>
            </tr>
        ));
    };

    const displayChart = () => {
        const chartOptions = {
            title: {
                text: "TK1 Optimisation Statistics",
            },
            xAxis: {
                title: {
                    text: "Time",
                },
                categories: [0, 5, 15, 25, 35, 45, 55],
                labels: {
                    align: "right",
                },
            },
            yAxis: {
                title: {
                    text: "Value",
                },
            },
            series: Object.entries(equipmentData).map(([key, value]) => ({
                name: key,
                data: value.values,
            })),
        };

        return (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        );
    };

    return (
        <>
            <h1>Predicted Future Operation Data</h1>
            <button onClick={getData}>Get Data</button>
            <div className="data-container">
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>{logData()}</tbody>
                </table>
                <div className="chart-area">{displayChart()}</div>
            </div>
        </>
    );
}

export default App;
