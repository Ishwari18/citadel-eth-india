// ChartComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const ChartComponent = ({ assetIndex, assetAddress }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const chartUrl =
          "http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/charts";
        const chartConfig = {
          headers: {
            Authorization: "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5",
          },
          params: {
            contract_address: assetAddress,
            chain_id: 1,
            addresses: ["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
            timerange: "1year",
          },
        };

        const chartResponse = await axios.get(chartUrl, chartConfig);
        const chartData = chartResponse.data;

        // Extract data for x-axis and y-axis
        const xValues = chartData.map(
          (data) =>
            `${new Date(data.timestamp * 1000).getUTCDate()}/${
              new Date(data.timestamp * 1000).getUTCMonth() + 1
            }`
        );
        const yValues = chartData.map((data) => data.value_usd);

        // Set the chart data
        setChartData({ xValues, yValues });
        console.error(`Chart for Asset ${assetIndex + 1} was fetched`);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    // Fetch chart data
    fetchChartData();
  }, [assetIndex, assetAddress]);

  useEffect(() => {
    if (chartData) {
      // Create the chart when chart data is available
      createChart(chartData.xValues, chartData.yValues, `Asset ${assetIndex + 1}`);
    }
  }, [chartData, assetIndex]);

  const createChart = (xValues, yValues, label) => {
    const ctx = document.getElementById(`myChart${assetIndex}`).getContext("2d");

    // Check if a chart instance already exists
    const existingChart = Chart.getChart(`myChart${assetIndex}`);

    // If a chart exists, destroy it
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: label,
            backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            data: yValues,
          },
        ],
      },
      options: {
        // Add any additional options here
      },
    });
  };

  return (
    <div className="chartmain">
      <canvas id={`myChart${assetIndex}`}></canvas>
    </div>
  );
};

export default ChartComponent;
