import { toastControl, toasting } from "@/utils/toast";
import { api } from "../setUp/setup";
import { iSImage } from "@/utils/images";

export const getUserData = async () => {
    try {
        const response = await api.get(`users/get_user_profile/`);
        console.log("getUserData-response.data: ", response.data);
        return response.data;
    }
    catch (err: any) {
        toasting(`Error getting userData: ${err}`, "error");
        return false;
    }
}
export const uploadProfilePic = async (file: File) => {
    if (!iSImage(file.name.split(".").pop()?.toLowerCase())) {
        toasting("not an Image", "error");
        return;
    };
    const formData = new FormData();
    formData.append("file", file);
    let toastID;
    try {
        toastID = toastControl("loading", "Uploading Profile Pic");

        const res = await api.post("users/upload_profile_pic/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toastControl("success", "successfuly uploaded image", toastID);
        return res.data.profile_pic_url;
    }
    catch (err) {
        toastControl("error", `failed to upload Image: ${err}`, toastID);
        return false;
    }
};


export const deleteProfilePic = async () => {
    let toastID;
    try {
        toastID = toastControl("loading", "Deleting Profile Pic");
        await api.delete("users/delete_profile_pic/");
        toastControl("success", "successfuly deleted Profile Pic", toastID);
        return true;
    }
    catch (err) {
        toastControl("error", `failed to delete Profile Pic: ${err}`, toastID);
        return false;
    }
}

export const getProfilePic = async () => {
    try {
        const response=await api.get("users/get_profile_pic/");
        return response.data.profilePicUrl;
    }
    catch (err) {
        toasting(`Error getting userData: ${err}`, "error");
        return false;
    }
}

export const handleUpdateProfile = async (firstNameInput:string,lastNameInput:string) => {
  try {
    const res = await api.put("/users/update_user_profile/", {
      first_name: firstNameInput,
      last_name: lastNameInput,
    });
    toasting("Profile updated successfully", "success");
    return res.data;
  } catch (err) {
    toasting(`Error updating profile: ${err}`, "error");
    return false;
  }
};
