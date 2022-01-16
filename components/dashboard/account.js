import React from "react";
import { useState, useEffect } from "react";
import dummyData from "../../scripts/dummyData.json";
import { setItem } from "../../scripts/firebase";

const Account = ({ userData, setUserData }) => {

  // Socials
  const [twitter, setTwitter] = useState(userData.socials.twitter);
  const [website, setWebsite] = useState(userData.socials.website);
  const [rarible, setRarible] = useState(userData.socials.rarible);

  // Logistics stuff
  const [link, setLink] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);


// Form validation 
  const onLinkChange = (e) => {
    if(e.target.value.includes(" ")) {
        alert("No spaces allowed in your username")
    } else {
        setLink(e.target.value)
    }
// todo: splice e.target.value to remove last char

  }

     const updateUserData = () => {
        const newUserData = {...userData, twitter: twitter, website: website, rarible: rarible, link: link, email: email}
        setUserData(newUserData)
        }

        const updateProfile = (value, type) => {
            if(type == "twitter") {
                setTwitter(value)
            } else if(type == "website") {
                setWebsite(value)
            } else if(type == "rarible") {
                setRarible(value)
            } else if(type == "email") {
                setEmail(value)
            } else if(type == "link") {
                setLink(value)
            }
        }
    


  useEffect(() => {
    
    setUserData({...userData, 
        username: link, 
        email: email, 
        socials: {
            twitter: twitter,
            rarible: rarible,
            website: website
        }   
    })   

    // setItem(userData);
         
    
  }, [twitter, website, rarible, link, email]);


        

  return (
    <div className="flex flex-col items-center py-10 px-8">
      <div className="flex flex-col items-center shadow-md border rounded-xl w-5/6 p-4 mb-10">
        <h1 className="font-bold text-lg mb-4">Email and Link</h1>
        <input
        onBlur={(e) => updateProfile(e.target.value, "email")}
          className="w-4/6 border rounded-md p-2 my-2 "
          type="email"
          placeholder="Email"
          defaultValue={userData.email}
        />
        <div className="w-4/6 flex items-center">
        <span className="rounded-l-md border-l border-t border-b p-2 my-2 text-gray-500 bg-gray-100 border-r">ntfin.bio/</span>
        <input
        onBlur={e => updateProfile(e.target.value, "link")}
          className="w-full border-y border-r rounded-r-md p-2 my-2"
          type="text"
          placeholder="Link"
          defaultValue={userData.username}

        />
        </div>
      </div>

      <div className="flex flex-col items-center shadow-md  rounded-xl w-5/6 p-4 border">
        <h1 className="font-bold text-lg mb-4">Socials</h1>
        <div className="w-4/6 flex items-center">
            <span className="rounded-l-md border-l border-t border-b p-2 my-2 text-gray-500 bg-gray-100 border-r">twitter.com/</span>
            <input  
            className="w-full border-y border-r rounded-r-md p-2 my-2"
            type="text"
            placeholder="Twitter"
            onBlur={e => updateProfile(e.target.value, "twitter")}
            defaultValue={userData.socials.twitter}
            />
        </div>
        <input
          className="w-4/6 border rounded-md p-2 my-2"
          type="text"
          placeholder="Rarible"
          onBlur={e => updateProfile(e.target.value, "rarible")}
          defaultValue={userData.socials.rarible}
        />

        <div className="w-4/6 flex items-center">
            <span className="rounded-l-md border-l border-t border-b p-2 my-2 text-gray-500 bg-gray-100 border-r">https://</span>
            <input  
            className="w-full border-y border-r rounded-r-md p-2 my-2"
            type="text"
            placeholder="Website"
            onBlur={e => updateProfile(e.target.value, "website")}
            defaultValue={userData.socials.website}
            />
        </div>
      </div>
    </div>
  );
};

export default Account;
