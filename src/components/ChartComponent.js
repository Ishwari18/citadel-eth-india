import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartComponent = () => {
  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      const url = "http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/charts";

      const config = {
        headers: {
          "Authorization": "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5"
        },
        params: {
          "contract_address": "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
          "chain_id": 1,
          "addresses": [
            "0xF977814e90dA44bFA03b6295A0616a897441aceC"
          ],
          "timerange": "1year"
        }
      };

      try {
        const response = await axios.get(url, config);
        const chartData = response.data;

        // Extract data for x-axis and y-axis
        const xValues = chartData.map(data => new Date(data.timestamp * 1000));
        const yValues = chartData.map(data => data.value_usd);

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
          datasets: [{
            backgroundColor: "rgba(216, 216, 247, 0.812)",
            borderColor: "rgba(216, 216, 247, 0.812)",
            data: yValues
          }]
        },
        options: {
          // Add any additional options here
        }
      });
    };

    // Call the function to fetch data and create the chart
    fetchDataAndCreateChart();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Chart Component</h2>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default ChartComponent;
