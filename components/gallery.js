import React from "react";
import Banner from "./banner";
import Nft from "./nft";
import Profile from "./profile";

const Gallery = ({ userData }) => {
  return (
    <>
      {/* Banner */}
      <div className="h-56 absolute w-full -z-10">
        <Banner height={56} extraStyles="" userData={userData} />
      </div>
      <div className="flex flex-col md:flex-row z-10">
        {/* User profile */}
        <div className="pt-12 md:pt-20 w-full md:w-96">
          <Profile userData={userData} />
        </div>
        {/* Actual NFTs */}
        <div className="md:pt-72 grid md:w-full md:grid-cols-3 grid-cols-1 gap-16 xl:gap-32 content-center align-center px-24 md:px-12 xl:px-24">
          {userData.nfts?.map((nft) => {
            return <Nft key={nft} nft={nft} />;
          })}
        </div>
        {/* Our logo */}
        <a
          className="md:hidden text-sm text-center text-gray-400 my-10"
          href="/"
        >
          Made with NFTree
        </a>
      </div>
    </>
  );
};

export default Gallery;
