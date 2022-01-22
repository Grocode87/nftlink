import { useState } from "react";
import { uploadImage } from "../../scripts/firebase";
import Modal from "../modal";
import FileUpload from "./file-upload";

const ProfilePicture = ({ userData, setUserData }) => {
  const [testImage, setTestImage] = useState("")
  /** Handle opening file select UI, then uploading the image and setting the userData image to the url */
  const uploadPicture = () => {
    setShowModel(true)
  };

  const onFileUpload = async (image) => {
    console.log(image)
    setShowModel(false)

    const path = await uploadImage(image, userData.address)
    console.log("done")
    console.log("image path: ", path)
    setUserData({...userData, image: path})
  }

  /** Ask for confirmation, then replace the users image with empty image */
  const removePicture = () => {

  };

  const [showModel, setShowModel] = useState(false)


  return (
    <>
    <div className="flex items-center justify-between gap-x-4 pb-8">
      <div className="w-1/5 shrink-0">
        <img  className="shadow-lg rounded-full border" src={userData.image} />
      </div>
      <button className="w-full" onClick={uploadPicture}>
      <div className="bg-blue-500 w-full px-4 py-2 rounded-lg text-center font-bold text-white">
        Upload Picture
      </div>
      </button>
      <div className="bg-gray-300 w-full px-4 py-2 rounded-lg text-center font-bold">
        Remove
      </div>
    </div>
    <Modal title={"Upload Profile Picture"} onClose={() => setShowModel(false)} show={showModel}>
      <FileUpload onFileUpload={onFileUpload}/>
    </Modal>
    </>
  );
};

export default ProfilePicture;
