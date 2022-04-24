import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import royalMintAbi from "./utils/RoyalMinterNFT.json" 
import './styles/App.css';

import logo from './assets/logo.svg';

const TWITTER_HANDLE = "damianjanik_dev"
const TWITTER_LINK = "https://twitter.com" + TWITTER_HANDLE
const OPENSEA_LINK = ""
const TOTAL_MINT_COUNT = 10 

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("")
  const [totalMinted, setTotalMinted] = useState(0)

  const checkIfWalletIsConnected = async () => {

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
      setupEventListener()
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
      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const renderConnecteWallet = () => (
   <button className="button connect-button" onClick={connectWallet}>Connect to Wallet</button>
  )

  const renderMintButton = () => (
    <button className="button mint-button" onClick={royalMinter}>Mint NFT</button>
   )
   
   const CONTRACT_ADDRESS = "0x68a34f3C74349Af7b43D3ac9Fa11427E061023b5"

   const setupEventListener = async () => {
      try {
        
        const { ethereum } = window;

        if (ethereum) {

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, royalMintAbi.abi, signer)

          connectedContract.on("RoyalNftMinted", (from, tokenId, totalCount) => {
            console.log("Sender:",from)
            console.log("Current Royal NFT #", tokenId.toNumber())
            console.Consolelog(`Currently minted ${totalCount} Royal NFTs`)
            console.log(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
          })

        } else {
          console.log("Ethereum object not found!")
        }

      } catch (error) {
        console.log(error)
      }
   }

   const royalMinter = async () => {
    try {

      const { ethereum } = window;
    
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, royalMintAbi.abi, signer)

        // Get waller and pay for the gas
        console.log("Creating your new NFT...")
        const nftTxn = await connectedContract.createNFT();

        // Mining the NFT...
        console.log("Mining in progress...")
        await nftTxn.wait()
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);



      } else {
        console.log("Ethernum object doesn't exist.")
      }

    } catch(error) {
      console.log(error)
    }


   }

   useEffect(() => {
    checkIfWalletIsConnected();
  }, [])




  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Your NFT Minter
        </p>
        {currentAccount === "" ? (renderConnecteWallet()) : (renderMintButton())}
      </header>
    </div>
  );
}

export default App;
