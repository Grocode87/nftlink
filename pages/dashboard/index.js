import React, { useState, useEffect } from "react";
import GalleryPreview from "../../components/gallery-preview";
import axios from "axios";
import ManageNfts from "../../components/dashboard/manage-nfts";
import Appearance from "../../components/dashboard/appearance";
import Account from "../../components/dashboard/account";
import Router from "next/router";
import { getItemByAddress, setItem } from "../../scripts/firebase";
import Image from "next/image";

import Cookies from "cookies";

const Dashboard = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("calling from dashboard/index.js, detected update in userData");
    setItem(userData);
  }, [userData]);

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
    ,
    {
      id: "analytics",
      name: "Analytics",
    },
  ];
  const [currTab, setCurrTab] = useState("nft");

  const copyLink = () => {
    const username = userData.username;
    navigator.clipboard.writeText(`https://nftinbio.vercel.app/${username}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="fixed w-full shadow-lg z-50 bg-white">
        <div className="w-full flex items-center p-4">
          <Image
            src="/landing-page/Logo.jpeg"
            className="md:scale-100"
            width={30}
            height={30}
          />
          <div className="text-3xl font-semibold pl-4">NFTinBio</div>
        </div>
        <div className="flex items-center"></div>
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

      <div className="pt-32 flex m-auto">
        <div className="w-1/2">
          {currTab == "nft" && (
            <ManageNfts
              userNfts={userData.nfts}
              userData={userData}
              setUserData={setUserData}
            />
          )}
          {currTab == "appearance" && (
            <Appearance userData={userData} setUserData={setUserData} />
          )}
          {currTab == "account" && (
            <Account userData={userData} setUserData={setUserData} />
          )}
        </div>

        {/** Preview */}
        <div className="border-l-2 p-16 w-1/2 flex flex-col items-center">
          <div className="fixed text-center">
            <button
              className="mr-2"
              onClick={() => {
                Router.push("/" + userData.username);
              }}
            >
              <div
                href={`localhost:3000/${userData.user}`}
                className="font-bold text-lg pb-4"
              >
                nftin.bio/{userData.username}{" "}
              </div>
            </button>

            {copied ? (
              <span className="text-sm text-white p-1 rounded-full bg-green-400 absolute">
                Copied!
              </span>
            ) : (
              <Image
                className="cursor-pointer"
                src="/images/copy.png"
                width={15}
                height={15}
                onClick={copyLink}
              />
            )}

            <div className="rounded-4xl overflow-hidden border-12 border-black">
            <div className="overflow-y-scroll overflow-x-hidden rounded-3xl h-150 w-72 bg-white">
              <GalleryPreview userData={userData} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  // Retrieve the users address cookie
  const cookies = new Cookies(req, res);
  const address = cookies.get("address");
  console.log(address);

  // if no address, redirect to /
  if (!address) {
    console.log("no address");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  // get nft's for address
  const { data } = await axios.post(
    "https://nftinbio.vercel.app/api/get-rarible",
    {
      address: address,
    }
  );

  const demoNFTS = [
    {
      id: "0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9:9082",
      name: "CryptoSkull #9082",
      image:
        "https://img.rarible.com/prod/image/upload/t_image_big/prod-itemImages/0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9:9082/9aded2c5",
      collection: "CryptoSkulls",
      price: 3,
      auctionLive: false,
    },
    {
      id: "0x6632a9d63e142f17a668064d41a21193b49b41a0:6396",
      name: "Prime Ape #6396",
      image:
        "https://img.rarible.com/prod/image/upload/t_image_big/prod-itemImages/0x6632a9d63e142f17a668064d41a21193b49b41a0:6396/5ccbe330",
      collection: "Prime Apes",
      price: 3.3,
      auctionLive: false,
    },
  ];

  let user = await getItemByAddress(address);

  // User document does not exist, create it
  if (!user) {
    console.log("ur new, imma get ur instance ready");
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
      image:
        "https://backalleycrossfit.com/wp-content/uploads/2016/09/profile-placeholder-300x300.png",
      nfts: data.nfts.concat(demoNFTS),
    };
  } else {
    // or, existing user is coming back, loop through retrieved nfts and add them to state if they are new
    console.log(
      "welcome back buddy, imma check to see if you've bought any new nfts"
    );

    let nftNames = user.nfts.map((nft) => {
      return nft.name;
    });

    data.nfts.concat(demoNFTS).forEach((nft) => {
      if (nftNames.indexOf(nft.name) == -1) {
        user.nfts.push(nft);
        console.log("found new nft, adding");
      }
    });
    user.image =
      "https://backalleycrossfit.com/wp-content/uploads/2016/09/profile-placeholder-300x300.png";
  }

  //update db with this info
  await setItem(user);

  return {
    props: {
      user: user,
    },
  };
}

export default Dashboard;
