import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Chart from "chart.js/auto";
import { ethers } from "ethers";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [dataForAllAssets, setDataForAllAssets] = useState([]);
  const assetArray = [
    "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
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

      // Check if a chart instance already exists
      const existingChart = Chart.getChart("myChart");

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
            contract_address: address,
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
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Check if Web3 is injected
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            setConnectedAddress(accounts[0]);
          }
        } else {
          console.error("Web3 provider not found");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    const fetchData = async () => {
      try {
        // Connect the wallet
        await connectWallet();

        // Fetch data for each token in assetArray
        const promises = assetArray.map(async (contractAddress) => {
          try {
            const tokenData = await fetchTokenData(contractAddress);
            return tokenData;
          } catch (error) {
            console.error(
              `Error fetching data for address ${contractAddress}:`,
              error
            );
            return null;
          }
        });

        // Wait for all promises to resolve
        const dataForAllAssets = await Promise.all(promises);
        const validData = dataForAllAssets.filter((data) => data !== null);

        setDataForAllAssets(validData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Helper function to fetch token data using ethers.js
    const fetchTokenData = async (contractAddress) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        // Add your ERC-20 ABI here
        [
          // ERC-20 ABI example
          "function name() view returns (string)",
          "function symbol() view returns (string)",
        ],
        provider
      );

      const [name, symbol] = await Promise.all([
        contract.name(),
        contract.symbol(),
      ]);

      return { address: contractAddress, name, symbol };
    };

    // Call the function to fetch data
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="portfolio">
      <Navbar />
      <div
        className="headbar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2
          className="dashhead"
          style={{ marginLeft: "2em", marginRight: "1em", fontWeight: "700" }}
        >
          Dashboard
        </h2>
        <div className="tvl" style={{ display: "flex" }}>
          <p style={{ marginRight: "0.5em" }}>Total Holdings:</p>
          <p style={{ color: "rgb(57, 169, 255)" }}>${totalValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="second-section" style={{ marginTop: "3em" }}>
        <div className="chartmain">
          <canvas id="myChart"></canvas>
        </div>
      </div>

      <div
        className="third-section"
        style={{ marginLeft: "3em", marginBottom: "5em", marginRight: "3em" }}
      >
        <p
          style={{
            marginRight: "1em",
            fontWeight: "700",
            marginTop: "2em",
            fontSize: "2em",
          }}
        >
          Your Assets
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Asset
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Balance (USD)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>PEPE</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                $353778
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                80.4%
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>MANA</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                $4284
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                32.5%
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>SOL</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>$32</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>-16%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
