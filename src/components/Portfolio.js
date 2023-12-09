import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const url = 'http://localhost:3001/?url=https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details';
      const config = {
        headers: {
          "Authorization": "Bearer cFc1AY00HRU0oIOcgOWlf3NUk5ZIyzC5"
        },
        params: {
          "chain_id": 1,
          "addresses": [
            "0xF977814e90dA44bFA03b6295A0616a897441aceC"
          ],
          "contract_address": "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
          "timerange": "1month"
        }
      };
      try {
        const response = await axios.get(url, config);
        setPortfolioData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPortfolioData();
  }, []); 

  return (
    <div className='portfolio'>
      <Navbar/>
      <div className="headbar">
        <h2 className='dashhead'>Dashboard</h2>
      </div>

      {portfolioData && (
        <div>
          <p>Amount: {portfolioData.amount}</p>
          <p>Price to USD: {portfolioData.price_to_usd}</p>
          <p>ROI: {portfolioData.roi}</p>
        </div>
      )}
      <div className="first-section">
        daily gainers & daily loosers
      </div>
      <div className="second-section">
        chart
      </div>
      <div className="third-section">
        asset list
      </div>
    </div>
  );
};

export default Portfolio;
