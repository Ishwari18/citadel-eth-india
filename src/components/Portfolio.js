import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Chart from "chart.js/auto";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [dataForAllAssets, setDataForAllAssets] = useState([]);
  const assetArray = [
    "0xF977814e90dA44bFA03b6295A0616a897441aceC",
    "0x46f80018211D5cBBc988e853A8683501FCA4ee9b",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Portfolio Data API
        const portfolioUrl =
          "http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details";
        const portfolioConfig = {
          headers: {
            Authorization: "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5",
          },
          params: {
            chain_id: 1,
            addresses: ["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
            contract_address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
            timerange: "1month",
          },
        };

        const portfolioResponse = await axios.get(
          portfolioUrl,
          portfolioConfig
        );
        setPortfolioData(portfolioResponse.data);

        // Chat API
        setTimeout(() => {
          // Chart API
          const chartUrl =
            "http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/charts";
          const chartConfig = {
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

          axios.get(chartUrl, chartConfig).then((chartResponse) => {
            const chartData = chartResponse.data;

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
            console.error("chart was fetched");
          });
        }, 3000); // Delay of 3 seconds

        // fetchTotalValue API
        setTimeout(() => {
          fetchTotalValue();
        }, 6000); // Delay of 6 seconds
      } catch (error) {
        console.error("Error:", error);
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
              label: "Total value",
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

    const fetchTotalValue = async () => {
      const promises = assetArray.map(async (address) => {
        const url = `http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details`;
        const config = {
          headers: {
            Authorization: "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5",
          },
          params: {
            chain_id: 1,
            addresses: ["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
            contract_address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
            timerange: "1day",
          },
        };
        try {
          const response = await axios.get(url, config);
          return response.data;
        } catch (error) {
          console.error(`Error fetching data for address ${address}:`, error);
          return null;
        }
      });

      // Wait for all promises to resolve
      const dataForAllAssets = await Promise.all(promises);
      const validData = dataForAllAssets.filter((data) => data !== null);
      const total = validData.reduce((sum, data) => {
        return sum + (data?.amount * data?.price_to_usd || 0);
      }, 0);

      setTotalValue(total);
      setDataForAllAssets(validData);
    };

    // Call the function to fetch data and create the chart
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="portfolio">
      <Navbar />
      <div className="headbar">
        <h2 className="dashhead">Dashboard</h2>
        <div className="tvl">
          <h3>Total Value</h3>
          <p>USD: ${totalValue.toFixed(2)}</p>
        </div>
      </div>

     
      <div className="second-section">
        <h2>Chart Component</h2>
        <div className="chartmain">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div className="third-section">asset list
      <ul>
        {dataForAllAssets.map((asset, index) => (
          <li key={index}>
            <p>Balance (USD): {asset?.amount * asset?.price_to_usd}</p>
            <p>ROI: {asset?.roi}</p>
          </li>
        ))}
      </ul></div>
    </div>
  );
};

export default Portfolio;