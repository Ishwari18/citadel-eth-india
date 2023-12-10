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
  const addWallet = (newAccount) => {
    // Check if the new account is not already in the connected accounts
    if (!connectedAccounts.includes(newAccount)) {
      // Add the new account to the connected accounts
      setConnectedAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    } else {
      // Handle the case where the account is already connected
      console.error("Wallet already connected:", newAccount);
    }
  };

  return (
    <WalletContext.Provider value={{ connectedAccounts, connectWallet, disconnectWallet  , addWallet}}>
      {children}
    </WalletContext.Provider>
  );
};
