import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalValue = ({ assetArray }) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchTotalValue = async () => {
      const promises = assetArray.map(async (address) => {
        const url = `http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details`;
        const config = {
          headers: {
            Authorization: "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5",
          },
          params: {
            "chain_id": 1,
            "addresses": [
              "0xF977814e90dA44bFA03b6295A0616a897441aceC"
            ],
            "contract_address": "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
            "timerange": "1day"
          }
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

      // Filter out null responses
      const validData = dataForAllAssets.filter((data) => data !== null);

      // Calculate total value
      const total = validData.reduce((sum, data) => {
        return sum + (data?.amount * data?.price_to_usd || 0);
      }, 0);

      setTotalValue(total);
    };

    fetchTotalValue();
  }, [assetArray]);

  return (
    <div>
      <h3>Total Value</h3>
      <p>USD: ${totalValue.toFixed(2)}</p>
    </div>
  );
};

export default TotalValue;
