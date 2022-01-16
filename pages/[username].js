import React from "react";
import Gallery from "../components/gallery";
import dummyData from '../scripts/dummyData.json'
import { getItemByUsername } from "../scripts/firebase";

const Username = ({ userData }) => {
  return <>
    <Gallery userData={userData}/>
  </>
}

export async function getServerSideProps(context) {
    const username = context.query.username


    // Username empty: redirect to index.js (landing page)
    if(username == "") {
      return {params:{}, redirect:"/"}
    }


    // TODO: Call API and get user info
    // Currently just get from json dummy data
    let userData;
    
    /**dummyData.forEach(user => {
        if(username == user.username) {
            userData = user;
        }
    
    }); */

    userData = await getItemByUsername(username)
    console.log(userData)


    // user not found: return 404
    if (!userData) {
        return {
          notFound: true,
        };
      }

    return {
      props: {
          userData: userData
        }, // will be passed to the page component as props
    }
  }
  

export default Username; 
