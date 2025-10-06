import { useEffect, useState } from "react";
import EditProfileComp from "../EditProfileComp";
import { getUserData } from "@/APIs/user/user";
import { handleUpdateProfile } from "@/APIs/user/user";
import ProfilePic from "../ProfilePic";
import {convertDateToMonthAndYear} from "@/utils/date"
type UserProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
};

const ProfileComp = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  useEffect(() => {
    getUserData().then((res) => {
      if (res) {
        setUserData(res);
        setFirstName(res.first_name);
        setLastName(res.last_name);
      }
    });
  }, []);


  const handleSave = async () => {
    handleUpdateProfile(tempFirstName, tempLastName).then((res) => {
      if (res) {
        setFirstName(res.first_name);
        setLastName(res.last_name);
      }
      setEditProfilePopUp(false);
    });
  };
  return (
    <div
      className="
      w-full rounded-lg bg-blue-100 min-h-20 p-2.5 lg:p-5
      flex min-[350px]:justify-between max-[350px]:flex-col max-[350px]:gap-5
    "
    >
      <EditProfileComp
        editProfilePopUp={editProfilePopUp}
        setEditProfilePopUp={setEditProfilePopUp}
        tempFirstName={tempFirstName}
        setTempFirstName={setTempFirstName}
        tempLastName={tempLastName}
        setTempLastName={setTempLastName}
        handleSave={handleSave}
      />
      <div className="flex max-sm:flex-col gap-5">
        <ProfilePic />
        <div className="flex flex-col">
          <div className="flex max-[300px]:flex-col gap-2">
            <p className="text-2xl text-emerald-700">
              {firstName === "" ? "FirstName" : firstName}
            </p>
            <p className="text-2xl text-emerald-700">
              {lastName === "" ? "LastName" : lastName}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src={"/icons/calendarBlackIcon.png"}
              alt="calander logo"
              className="w-4"
            />
            <p className="text-sm">
              Joined {convertDateToMonthAndYear(userData?.date_joined)}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setEditProfilePopUp(true)}
        className="bg-white p-2.5 rounded-lg self-start hover:cursor-pointer hover:bg-gray-50"
      >
        Edit profile
      </button>
    </div>
  );
};

export default ProfileComp;
