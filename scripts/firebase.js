// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, getDoc, setDoc, doc, query, where } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLZbZU5HIsJMGt8n8E3-TXaLn3UYPZCRk",
  authDomain: "nftinbio.firebaseapp.com",
  projectId: "nftinbio",
  storageBucket: "nftinbio.appspot.com",
  messagingSenderId: "544958889229",
  appId: "1:544958889229:web:576835e346072d5cd2c444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const storage = getStorage()
const profileImageRef = ref(storage, "images")

const setItem = async (user) => {
  // Add a new document in collection "cities"
  await setDoc(doc(db, "users", user.address), {
    address: user.address,
        username: user.username, 
        displayName: user.displayName,
        email: user.email,
        description: user.description,
        theme: user.theme || "blue",
        
        socials: {
            twitter: user.socials.twitter, 
            rarible: user.socials.rarible, 
            website: user.socials.website
        },
        image: user.image,
        nfts: user.nfts
});
}

const getItemByUsername = async (username) => {

  const docRef = collection(db, "users")
  const q = query(docRef, where('username', '==', username))

  const querySnapshot = await getDocs(q)

  if(querySnapshot.empty) return null;

  const userData = {...querySnapshot.docs[0].data(), address: querySnapshot.docs[0].id}
  return userData
  

 
  
}

const getItemByAddress = async (address) => {
  const docRef = doc(db, "users", address);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

const uploadImage = async (image, address) => {
  const newImageRef = ref(profileImageRef, address)

  const snapshot = await uploadBytes(newImageRef, image)
  

  console.log("Image uploaded to firebase")
  const downloadUrl = await getDownloadURL(snapshot.ref)

  console.log("fetched download url")
  return downloadUrl
  
}



export { db, setItem, getItemByAddress, getItemByUsername, uploadImage };