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

    const renderTable = () => {
        return (
            <div>
                <h2>Metric Values</h2>
                <button onClick={getData}>Get Data</button>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Last Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(equipmentData).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value.values[value.values.length - 1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderChart = () => {
        const chartOptions = {
            title: {
                text: "TK1 Metrics Line Graph",
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
                data: value.values
              })
            ),
        };

        return (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        );
    };

    return (
        <div>
            {renderTable()}
            {renderChart()}
        </div>
    );
}

export default App;
