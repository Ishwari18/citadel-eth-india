// WalletContext.js
import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  const connectWallet = (account) => {
    setConnectedAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  const disconnectWallet = (account) => {
    setConnectedAccounts((prevAccounts) =>
      prevAccounts.filter((connectedAccount) => connectedAccount !== account)
    );
  };

  return (
    <WalletContext.Provider value={{ connectedAccounts, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
