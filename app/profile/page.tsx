"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import ProfileComp from "@/components/ProfilePage/ProfileComp";

const ProfilePage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);


  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <div className="w-full xl:p-20 lg:p-16 md:p-14 sm:p-10 p-5">
          <ProfileComp />
        </div>
      </div>
    )
  );
};

export default ProfilePage;
