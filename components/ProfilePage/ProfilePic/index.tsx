import React, { useEffect, useRef, useState } from "react";
import {
  uploadProfilePic,
  deleteProfilePic,
  getProfilePic,
} from "@/APIs/user/user";
import ConfirmDeleteYesOrCancle from "../../ConfirmDeleteYesOrCancle";
import { toasting } from "@/utils/toast";

const ProfilePic = () => {
  const [previewPic, setPreviewPic] = useState<string | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [confirmDeletePopUp, setConfirmDeletePopUp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getProfilePic().then((res) => {
      if (res) {
        setProfilePicUrl(res);
        setPreviewPic(res);
      }
    });
  }, []);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const localPreview = URL.createObjectURL(file);
    setPreviewPic(localPreview);

    const uploadedUrl = await uploadProfilePic(file);
    if (uploadedUrl) {
      setPreviewPic(uploadedUrl);
      setProfilePicUrl(uploadedUrl);
    }
  };

  const handleDelete = async () => {
    if (previewPic === null) {
      toasting("No profile pic to delete", "error");
      return;
    }
    const success = await deleteProfilePic();
    if (success) {
      setPreviewPic(null);
      setProfilePicUrl(null);
    }
    setConfirmDeletePopUp(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-40 h-40 rounded-full overflow-hidden">
        <ConfirmDeleteYesOrCancle
          confirmDeletePopUp={confirmDeletePopUp}
          setConfirmDeletePopUp={setConfirmDeletePopUp}
          titleString={"Delete Profile Pic?"}
          onYes={handleDelete}
        />
        <img
          src={previewPic || "defaultProfilePic.webp"}
          alt="profile image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
          <button
            onClick={handleUploadClick}
            className="bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-100"
          >
            Update
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => setConfirmDeletePopUp(true)}
            className="bg-red-500 text-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="lg:hidden">
        <button
          onClick={handleUploadClick}
          className="bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-100"
        >
          Update
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => setConfirmDeletePopUp(true)}
          className="bg-red-500 text-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfilePic;
