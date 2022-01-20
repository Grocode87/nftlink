import React, { useState } from "react";
import ProfilePicture from "./profile-picture";

export const themes = [
  {
    id: "light",
    name: "Light",
    colors: ["#F6F6F6", "#F6F6F6"],
  },
  {
    id: "dark",
    name: "Dark",
    colors: ["#242424", "#242424"],
  },
  {
    id: "blue",
    name: "Ocean",
    colors: ["#26EDEA", "#1691FF"],
  },
  {
    id: "red",
    name: "Rose",
    colors: ["#971114", "#DF1B1B"],
  },
  {
    id: "purple",
    name: "Vice",
    colors: ["#FE6DE5", "#711BDF"],
  },
  {
    id: "green",
    name: "Mint",
    colors: ["#1FC836", "#ADFFC5"],
  },
  {
    id: "grey",
    name: "Shades",
    colors: ["#bdc3c7", "#2c3e50"],
  },
  {
    id: "Teal",
    name: "Alison",
    colors: ["#43cea2", "#185a9d"],
  },
  {
    id: "Mauve",
    name: "Peach",
    colors: ["#ba5370", "#f4e2d8"],
  },
];

const Appearance = ({ userData, setUserData }) => {
  const [currTheme, setCurrTheme] = useState(userData.theme);

  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.description);

  const updateUserData = () => {
    if (name != userData.displayName || bio != userData.description) {
      const newUserData = {
        ...userData,
        displayName: name || "",
        description: bio || "",
      };

      setUserData(newUserData);
    }
  };

  const updateProfile = (value, type) => {
    if (type == "name") {
      setName(value);
    } else if (type == "bio") {
      setBio(value);
    }
  };

  const changeTheme = (themeId) => {
    setUserData({ ...userData, theme: themeId });
    setCurrTheme(themeId);
  };

  return (
    <div className="p-12 px-32">
      <div>
        <p className="text-2xl font-semibold pb-4">Profile</p>
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <p className="pb-2">Profile Picture</p>
          <ProfilePicture userData={userData} />
          <p className="pb-2">Profile Title</p>
          <input
            className="w-full border rounded-md p-2 border-gray-300 hover:border-gray-500"
            defaultValue={userData.displayName}
            placeholder="Enter a display name"
            onBlur={updateUserData}
            onChange={(e) => {
              updateProfile(e.target.value, "name");
            }}
          ></input>

          <p className="pt-8 pb-2">Bio</p>
          <textarea
            className="w-full h-40 border p-2 rounded-md border-gray-300 hover:border-gray-500"
            placeholder="Enter a bio to appear in your NFTinBio page"
            defaultValue={userData.description}
            onBlur={updateUserData}
            onChange={(e) => {
              updateProfile(e.target.value, "bio");
            }}
          ></textarea>
        </div>
      </div>

      <div className="mt-20">
        <p className="text-2xl font-semibold pb-4">Theme</p>

        <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
          <div className="p-4 text-lg">
            <div className="grid grid-cols-3">
              {themes.map(({ id, name, colors }) => {
                return (
                  <button onClick={() => changeTheme(id)}>
                    <div
                      className={
                        "p-2 border-2 border-white rounded-lg " +
                        (currTheme == id ? "border-2 border-gray-300" : "")
                      }
                    >
                      <div
                        className={
                          "mx-2 rounded-lg overflow-hidden text-center my-2 "
                        }
                      >
                        {colors.length > 1 ? (
                          <div
                            className="h-20"
                            style={{
                              background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}`,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="h-20"
                            style={{ backgroundColor: colors[0] }}
                          ></div>
                        )}

                        <p className="text-lg">{name}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
