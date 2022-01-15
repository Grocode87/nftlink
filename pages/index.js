import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router'
import { ethers } from 'ethers';

export default function Home() {
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(localStorage.getItem('address'))
    localStorage.getItem('address') !== "" && Router.push('/dashboard');
  }, []);



  console.log(address)

  // Request access to MetaMask account
  const requestAccount = async () => {  
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }


  // Connect ethereum wallet using metamask
  const connectWallet = async (e) => {
    if(window.ethereum !== 'undefined') {
      try {
        await requestAccount();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
        setAddress(await signer.getAddress());
        localStorage.setItem('address', await signer.getAddress());

       
      } catch(err) {
        console.error(err)
      }
    }
  }




  return (
    <div className="container">
      <Head>
        <title>NFTInBio | Show off your NFTs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main>
        <h1 className="text-sm">
        {address}

        </h1>


        <button onClick={connectWallet}>Connect Wallet</button>
      </main>
    </div>
  )
}
