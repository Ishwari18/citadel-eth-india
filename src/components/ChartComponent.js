import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartComponent = () => {
    useEffect(() => {
        const fetchDataAndCreateChart = async () => {
          const url =
            "http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/charts";
      
          const config = {
            headers: {
              Authorization: "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5",
            },
            params: {
              contract_address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
              chain_id: 1,
              addresses: ["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
              timerange: "1year",
            },
          };
      
          try {
            const response = await axios.get(url, config);
            const chartData = response.data;
      
            // Extract data for x-axis and y-axis
            const xValues = chartData.map(
              (data) =>
                `${new Date(data.timestamp * 1000).getUTCDate()}/${
                  new Date(data.timestamp * 1000).getUTCMonth() + 1
                }`
            );
            const yValues = chartData.map((data) => data.value_usd);
      
            // Create the chart
            createChart(xValues, yValues);
          } catch (error) {
            console.error(error);
          }
        };
      
        const createChart = (xValues, yValues) => {
          const ctx = document.getElementById("myChart").getContext("2d");
      
          new Chart(ctx, {
            type: "line",
            data: {
              labels: xValues,
              datasets: [
                {
                  backgroundColor: "rgb(57, 169, 255)",
                  borderColor: "rgb(57, 169, 255)",
                  data: yValues,
                },
              ],
            },
            options: {
              // Add any additional options here
            },
          });
        };
      
        // Call the function to fetch data and create the chart
        fetchDataAndCreateChart();
      }, []); // Empty dependency array ensures useEffect runs only once
      
  return (
    <>
      <h2>Chart Component</h2>
      <div className="chartmain">
        <canvas id="myChart"></canvas>
      </div>
    </>
  );
};

export default ChartComponent;
