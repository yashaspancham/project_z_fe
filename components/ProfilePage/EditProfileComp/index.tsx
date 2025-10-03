"use client";
import { useEffect } from "react";


const EditProfileComp = ({
  editProfilePopUp,
  setEditProfilePopUp,
  tempFirstName,
  setTempFirstName,
  tempLastName,
  setTempLastName,
  handleSave,
}: any) => {


  const handleCancel = () => {
    setEditProfilePopUp(false);
    setTempFirstName("");
    setTempLastName("");
    document.body.style.overflow = "";
  };

  
  useEffect(() => {
    if (editProfilePopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [editProfilePopUp]);
  if (!editProfilePopUp) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] text-md"
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 min-h-[150px] w-[300px] bg-gray-200 rounded-lg flex flex-col gap-6 items-center"
      >
        <p className="text-xl">Update Profile</p>

        <div className="flex flex-col w-full gap-3">
          <input
            type="text"
            value={tempFirstName}
            maxLength={20}
            onChange={(e) => setTempFirstName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder={"firstName"}
          />
          <input
            type="text"
            maxLength={20}
            value={tempLastName}
            onChange={(e) => setTempLastName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder={"lastName"}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 hover:cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComp;
