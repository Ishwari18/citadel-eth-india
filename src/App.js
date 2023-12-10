import "./App.css";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { WalletProvider } from './components/WalletContext';


function App() {
  return (
    <>
      <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/pfp" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      </WalletProvider>
    </>
  );
}

export default App;
