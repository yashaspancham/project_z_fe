"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import ProfileComp from "@/components/ProfilePage/ProfileComp";
import ProfileStats from "@/components/ProfilePage/ProfileStats";
import { entriesStats, tasksStats } from "@/APIs/user/stats";
import Entries from "@/components/ProfilePage/Entries";

type StatData = {
  subText: string;
  value: number | string;
};

type Stats = Record<string, StatData>;

const ProfilePage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [Entrystats, setEntryStats] = useState<Stats | null>(null);
  const [taskStats, setTaskStats] = useState<Stats | null>(null);
  useEffect(() => {
    entriesStats().then((res) => {
      if (res) {
        setEntryStats(res);
      }
    });
    tasksStats().then((res) => {
      if (res) {
        setTaskStats(res);
      }
    });
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <div className="w-full xl:p-20 lg:p-16 md:p-14 sm:p-10 p-5 mb-20">
          <ProfileComp />
          <div className="flex lg:flex-row flex-col">
            {/* flex flex-col max-lg:flex-row max-lg:flex-wrap max-lg:justify-center*/}
            <div className="flex gap-5 flex-col items-center">
              <ProfileStats stats={{ ...Entrystats, ...taskStats }} />
              <div className="flex lg:flex-col max-lg:flex-row max-lg:flex-wrap justify-center gap-5">
                <div className="p-5 w-[250px] bg-[#fcfcff] rounded">
                  <p className="text-xl">This Week's Mood</p>
                  <p className="text-purple-800">Cooming Soon</p>
                </div>
                <div className="p-5 w-[250px] bg-[#fcfcff] rounded">
                  <p className="text-xl">Request a feature</p>
                  <p className="text-purple-800">Cooming Soon</p>
                </div>
                <div className="p-5 w-[250px] bg-[#fcfcff] rounded">
                  <p className="text-xl">Buy Creator a Idle</p>
                  <p className="text-purple-800">Cooming Soon</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <Entries />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfilePage;
