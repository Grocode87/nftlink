import React, { useState, useEffect } from "react";
import Gallery from "../../components/gallery";
import GalleryPreview from "../../components/gallery-preview";
import { IFrame } from "../../components/iframe";
import dummyData from "../../scripts/dummyData.json";
import axios from "axios";
import ManageNfts from "../../components/dashboard/manage-nfts";
import Appearance from "../../components/dashboard/appearance";
import Account from "../../components/dashboard/account";
import Router from "next/router";
import { getItemByAddress, setItem } from "../../scripts/firebase";

import Cookies from 'cookies'

const Dashboard = ({ user }) => {
    
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    console.log("calling from dashboard/index.js, detected update in userData")
    setItem(userData);
  }, [userData])

  /**
   * Tab Options
   *
   * - nft
   * - appearance
   * - account
   */
  const tabs = [
    {
      id: "nft",
      name: "NFTs",
    },
    {
      id: "appearance",
      name: "Appearance",
    },
    {
      id: "account",
      name: "Account",
    },
  ];
  const [currTab, setCurrTab] = useState("nft");

  return (
    <div>
      {/* Header */}
      <div className="fixed w-full bg-white shadow-lg flex items-center z-50">
        {tabs.map((tab) => {
          return (
            <button
              onClick={() => {
                setCurrTab(tab.id);
              }}
            >
              <div
                className={
                  "text-xl px-16 py-4 hover:bg-gray-50 " +
                  (tab.id == currTab ? "border-b-4 border-blue-400" : "")
                }
              >
                <p>{tab.name}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-16 flex">
        <div className="w-1/2">
          {currTab == "nft" && <ManageNfts userNfts={userData.nfts} userData={userData} setUserData={setUserData} />}
          {currTab == "appearance" && <Appearance userData={userData} setUserData={setUserData}/>}
          {currTab == "account" && <Account userData={userData} setUserData={setUserData}/>}
        </div>

        {/** Preview */}
        <div className="border-l-2 p-16 w-1/2 flex flex-col items-center">
          <div className="fixed text-center">
            <p className="font-bold text-lg pb-4">
              nftin.bio/{userData.username}
            </p>
            <div className="overflow-scroll h-128 w-72 rounded-3xl border-8 border-black">
              <GalleryPreview userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({req, res}) {
  
  // Retrieve the users address cookie
  const cookies = new Cookies(req, res)
  const address = cookies.get('address')
  console.log(address)

  // if no address, redirect to /
  if(!address) {
    console.log("no address")
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    }
  }

  // get nft's for address
  const { data } = await axios.post("https://nftinbio.vercel.app/api/get-rarible", {
    address: address,
  });
  

  let user = await getItemByAddress(address);

  // User document does not exist, create it
  if(!user) {
    console.log("ur new, imma get ur instance ready")
    user = {
      address: address,
      username: "",
      displayName: "",
      email: "",
      description: "",
      theme: "blue",
      socials: {
        twitter: "",
        rarible: "",
        website: "",
      },
      image: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
      nfts: data.nfts,
    }
  } else {
    // or, existing user is coming back, loop through retrieved nfts and add them to state if they are new
    console.log("welcome back buddy, imma check to see if you've bought any new nfts")
    let nftNames = user.nfts.map((nft) => {return nft.name})
    data.nfts.forEach(nft => {
      if(nftNames.indexOf(nft.name) == -1) {
        user.nfts.push(nft)
        console.log("found new nft, adding")
      }
    });
    user.image = "https://backalleycrossfit.com/wp-content/uploads/2016/09/profile-placeholder-300x300.png"
    user.nfts = data.nfts
  }

  //update db with this info
  await setItem(user)

  return {
    props: {
      user: user,
    },
  };
}

export default Dashboard;
