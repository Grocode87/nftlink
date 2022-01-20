const ProfilePicture = ({ userData }) => {
  /** Handle opening file select UI, then uploading the image and setting the userData image to the url */
  const uploadPicture = () => {};

  /** Ask for confirmation, then replace the users image with empty image */
  const removePicture = () => {};

  return (
    <div className="flex items-center justify-between gap-x-4 pb-8">
      <div className="w-1/5 shrink-0">
        <img className="rounded-full" src={userData.image} />
      </div>
      <div className="bg-blue-500 w-full px-4 py-2 rounded-lg text-center font-bold text-white">
        Upload Picture
      </div>
      <div className="bg-gray-300 w-full px-4 py-2 rounded-lg text-center font-bold">
        Remove
      </div>
    </div>
  );
};

export default ProfilePicture;
