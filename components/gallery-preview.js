import React, { useEffect, useState } from "react";
import Nft from "./nft";

import Image from "next/image";
import Banner from "./banner";

const GalleryPreview = ({ userData }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    const address = userData.address;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {/* Banner */}
      <Banner height={32} extraStyles="-mb-28 -z-10" userData={userData} />
      <div className="flex flex-col z-10">
        {/* User profile */}
        <div className="w-full">
          <div className="pt-12 space-y-2 flex flex-col items-center">
            <div className="px-16">
              <img className="rounded-full" src={userData.image} />
            </div>
            <div className="px-4">
              <p className="text-2xl font-bold">{userData.displayName}</p>
              <p
                onClick={copyAddress}
                className="cursor-pointer bg-gray-100 rounded-full inline-block px-2 py-1 text-gray-500 text-xs"
              >
                {copied
                  ? "Copied"
                  : userData.address.substring(0, 4) +
                    "... " +
                    userData.address.substring(
                      userData.address.length - 4
                    )}{" "}
                {copied ? (
                  <></>
                ) : (
                  <Image src="/images/clipboard.png" width={15} height={15} />
                )}
              </p>
              <p className="text-sm pt-2">{userData.description}</p>

              {(userData.socials.twitter ||
                userData.socials.rarible ||
                userData.socials.website) && (
                <div className="pt-2">
                  {userData.socials.twitter && (
                    <a
                      className="pr-2"
                      href={`https://twitter.com/${userData.socials.twitter}`}
                    >
                      <Image
                        src="/images/social/twitter.png"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}

                  {userData.socials.rarible && (
                    <a
                      className="pr-2"
                      href={`https://rarible.com//${userData.socials.rarible}`}
                    >
                      <Image
                        src="/images/social/rarible.png"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}

                  {userData.socials.website && (
                    <a
                      className="pr-2"
                      href={`https://${userData.socials.website}`}
                    >
                      <Image
                        src="/images/social/website.png"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Actual NFTs */}
        <p className="font-bold text-xl pb-4 pt-8">NFTS</p>
        <div className="grid grid-cols-1 gap-8 content-center align-center px-4">
          {userData.nfts?.map((nft) => {
            return (
              <div className="m-auto flex-col group hover:cursor-pointer text-left p-4 border shadow-lg rounded-xl">
                <div className="px-8">
                  <img
                    className="w-full rounded-2xl mb-2 group-hover:drop-shadow-lg ease-in duration-200"
                    src={nft.image}
                  />
                </div>
                <p className="text-xs text-gray-400 px-2">{nft.collection}</p>
                <h2 className="text-sm font-bold px-2">{nft.name}</h2>
                <div className="flex w-full justify-between items-center px-2">
                  <p className="text-xm text-gray-400 pt-2">Price:</p>
                  {/* Bid price */}
                  <p>
                    <span className="font-bold">{nft.price}</span>{" "}
                    <span className="text-gray-400">ETH</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our logo */}
      <a className="text-sm text-center text-gray-400 my-4" href="/">
        Made with NFTree
      </a>
    </>
  );
};

export default GalleryPreview;
