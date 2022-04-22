import React, { useEffect, useState } from "react";
import './styles/App.css';

import logo from './assets/logo.svg';

const TWITTER_HANDLE = "damianjanik_dev"
const TWITTER_LINK = "https://twitter.com" + TWITTER_HANDLE
const OPENSEA_LINK = ""
const TOTAL_MINT_COUNT = 10 

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("")


  const checkIfWallerIsConnected = async () => {

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Please install MetaMask!")
      return
    } else {
      console.log("MetaMask Connected...")
    }

    // Check if we're authorised to access wallet
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0]
      setCurrentAccount(account)
    } else {
      console.log("No valid MetaMask account found!")
    }

  }

  const connectWallet = async () => {
    try {

      const {  ethereum } = window

      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request( { method: "eth_requestAccounts"} );

      console.log("Account Connected: ", accounts[0])
      setCurrentAccount(accounts[0])

    } catch (error) {
      console.log(error)
    }
  }

  const renderConnecteWallet = () => (
   <button className="button connect-button">Connect to Wallet</button>
  )

  const renderMintButton = () => (
    <button className="button mint-button" onClick={connectWallet}>Mint NFT</button>
   )

  useEffect(() => {
    checkIfWallerIsConnected()
  }, [])




  return (

    <div className="App">
      <svg className="styleGradient">
        <linearGradient id="my-cool-gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="#447799"/>
          <stop offset="50%" stopColor="#224488"/>
          <stop offset="100%" stopColor="#112266"/>
        </linearGradient>
      </svg>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Your NFT Minter
        </p>
        {currentAccount === "" ? renderConnecteWallet() : renderMintButton()}
      </header>
    </div>
  );
}

export default App;
