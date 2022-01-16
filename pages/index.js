import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router'
import { ethers } from 'ethers';
import Image from 'next/image';

export default function Home() {
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if(address !== "") {
      Router.push('/dashboard');
    }

  }, [address])

  // If user logged in, redirect to dashboard
  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const addresses = await provider.listAccounts(); 

    // it doesn't create metamask popup, remove user from localstorage
    if (addresses.length > 0) {
      setAddress(localStorage.getItem('address'));
    } else {
      setAddress("");
      localStorage.setItem('address', "");
    }

    localStorage.getItem('address') !== "" && Router.push('/dashboard');
  }, []);

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

  {/* HERE */}
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        <header class="bg-white p-4">
        <nav class="container mx-auto flex flex-row justify-between items-center text-black">
            <div class="text-4xl">SteffOverflow</div>
            <div class="hidden laptop:block">
                <a class="link" href="">Home</a>
                <a class="link" href="">Features</a>
                <a class="link" href="">Gallery</a>
            </div>
            <div class="fixed bottom-4 bg-formButtonBackground right-4 rounded-full px-4 py-6 z-50 laptop:hidden" id="hamburger">
                <span>Menu</span>
            </div>
            <div class="fixed flex flex-col py-4 justify-center text-2xl items-center inset-0 bg-white hidden js-toggle">
                <a class="link" href="">Home</a>
                <a class="link" href="">Features</a>
                <a class="link" href="">Gallery</a>
            </div>
        </nav>
    </header>
    
<main>           
        {/**Home**/}
        <div class="container mx-auto flex flex-row justify-between items-center py-32 laptop:bg-hero-pattern laptop:bg-cover laptop:bg-no-repeat laptop:bg-center">
                <div class="flex flex-col">
                    <h1>
                    Showcase Your Collection of NFTs 
                    </h1>
                    <p class="mb-10">
                    Connect your social plarforms to all of your NFTs with just one link in the biography.
                    </p>
                    <a class="button w-max">
                    Get Started
                    </a>
                </div>
                <div class="hidden tablet:block">
                    <img src="nftlink/public/landing-page/Landing Page-iPhone.png"/>
                </div>

        {/**FEATURED */}
        <div class="wrapper laptop:bg-about-pattern laptop:bg-cover laptop:bg-no-repeat laptop:bg-center">
                <div class="flex flex-col laptop:flex-row laptop:items-center">
                    <div class="flex-1 mb-8 bg-portfolio-work-background bg-no-repeat bg-left laptop:bg-center py-8 laptop:mb-0 laptop:mr-8 desktop:mr-0">
                        <img class="w-495 h-285 rounded ml-3 laptop:mx-auto"  src="images/portfolio-1.png" alt=""/>
                    </div>
                    <h2 class="mb-12">Use and Link it Anywhere</h2>
                    <p class="flex-1">
                    Use your NFTinBio on any social platform
                    where your audience is, help them bid and 
                    discover all your collectibles.
                    </p>
          </div>
          <div class="wrapper laptop:bg-about-pattern laptop:bg-cover laptop:bg-no-repeat laptop:bg-center">
                <div class="flex flex-col laptop:flex-row laptop:items-center">
                    <h2 class="mb-12">Integrates Easily with Rarible</h2>
                    <p class="flex-1">
                    NFTinBio intergrates seemlessly with your
                    Rarible account so you can show off your
                    collection of NFTs to your social media platform.
                    </p>
                    <div class="flex-1 mb-8 bg-portfolio-work-background bg-no-repeat bg-left laptop:bg-center py-8 laptop:mb-0 laptop:mr-8 desktop:mr-0">
                        <img class="w-495 h-285 rounded ml-3 laptop:mx-auto"  src="images/portfolio-1.png" alt=""/>
                    </div>
          </div>

          <div class="wrapper laptop:bg-about-pattern laptop:bg-cover laptop:bg-no-repeat laptop:bg-center">
                <div class="flex flex-col laptop:flex-row laptop:items-center">
                    <div class="flex-1 mb-8 bg-portfolio-work-background bg-no-repeat bg-left laptop:bg-center py-8 laptop:mb-0 laptop:mr-8 desktop:mr-0">
                        <img class="w-495 h-285 rounded ml-3 laptop:mx-auto"  src="images/portfolio-1.png" alt=""/>
                    </div>
                    <h2 class="mb-12">Safe and Secure Access</h2>
                    <p class="flex-1">
                    We’re committed to affirming the privacy of
                    our users and visitors. Our platform is 
                    trusted and secure.
                    </p>
          </div>

        {/**NEWSLETTER */}
        <div className="newsletter section">
        </div>
</main>
        {/**FOOTER */}
        <footer>
            <div className="footer-content section">
            </div>
        </footer>
        </div>
  
    </div>
  )
}
