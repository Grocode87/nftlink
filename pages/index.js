import Head from "next/head";
import { useState, useEffect } from "react";
import Router from "next/router";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import cookieCutter from "cookie-cutter";

export default function Home() {
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    window.ethereum == "undefined" &&
      alert(
        "Please install Metamask and use Chrome browser to use this application."
      );
  });

  useEffect(() => {
    if (address !== "") {
      //Router.push("/dashboard");
    }
  }, [address]);

  // If user logged in, redirect to dashboard
  useEffect(async () => {
    if (window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const addresses = await provider.listAccounts();

        // it doesn't create metamask popup, remove user from localstorage
        if (addresses.length > 0) {
          setAddress(cookieCutter.get("address"));
        } else {
          setAddress("");
          cookieCutter.set("address", "");
        }
      } catch (err) {
        console.error(err);
      }
    }

    // localStorage.getItem("address") !== "" && Router.push("/dashboard");
  }, []);

  // Request access to MetaMask account
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // Connect ethereum wallet using metamask
  const connectWallet = async (e) => {
    if (window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setAddress(await signer.getAddress());
        cookieCutter.set("address", await signer.getAddress());
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install Metamask to use this app");
    }
  };

  return (
    <>
      <Head>
        <title>Matrice | One Link for all your NFTs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HERE */}
      <div className="w-full md:w-screen sm:w-screen py-6 px-12 md:px-9  sm:px-6 bg-white shadow-lg flex flex-row">
        <div className="flex justify-center">
          <Image
            src="/landing-page/Logo.jpeg"
            className="md:scale-100"
            width={30}
            height={30}
          />
          <div className="text-3xl font-semibold pl-4">NFTinBio</div>
        </div>
      </div>
      <main className="flex flex-col md:flex-row justify-center items-center my-12 mt-24">
        {/**Home**/}

        <div className="w-5/12 flex justify-center items-center mb-20 md:mb-0">
          <Image
            src="/landing-page/Landing_Page-iPhone_.png"
            className=""
            width={200}
            height={400}
          />
        </div>
        <div className="w-7/12 text-center md:text-left md:mr-32 sm:mr-12">
          <p className="font-semibold text-3xl md:text-5xl">
            Showcase Your Collection of NFTs
          </p>
          <p className="mb-10 mt-5 md:mb-7.5 sm:mb-5 text-2xl md:text-xl sm:text-xl pt-4 sm:pt-2">
            Connect your social platforms to all of your NFTs with just one
            link!
          </p>

          <p className="mb-20 text-2xl md:text-1xl sm:text-xl  pt-4 sm:pt-2">
            Use your custom link on any social platform where your audience is
            and make it easier for them to discover all your collectibles.
          </p>
          {address ? (
            <a
              onClick={() => Router.push("/dashboard")}
              className="button w-max bg-blue-600 px-4 py-2 text-xl rounded-lg text-white cursor-pointer"
            >
              Go to Dashboard
            </a>
          ) : (
            <a
              onClick={connectWallet}
              className="button w-max bg-blue-600 px-4 py-2 text-xl rounded-lg text-white cursor-pointer"
            >
              Get Started
            </a>
          )}
        </div>
      </main>
    </>
  );
}
