"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getColor } from "@/utils/getColorForSideMenu";

const ConfirmDeleteYesOrCancle = ({ confirmDeletePopUp, setConfirmDeletePopUp, titleString,onYes }: any) => {
  const pathname = usePathname();
    const handleCancel = () => {
    setConfirmDeletePopUp(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (confirmDeletePopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmDeletePopUp]);
  if (!confirmDeletePopUp) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] text-md"
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 h-[150px] w-[300px] bg-gray-200 rounded-lg flex flex-col gap-6 items-center"
      >
        <p className="text-xl">{titleString}</p>
        <div className="flex gap-2">
          <button
          onClick={()=>setConfirmDeletePopUp(false)}
            className={`
          ${getColor(pathname)[1]} ${getColor(pathname)[2]}
             text-white hover:cursor-pointer 
             p-2 rounded-lg`}
          >
            Cancle
          </button>
          <button 
          onClick={()=>{onYes()}}
          className="bg-red-700 hover:bg-red-600 text-white hover:cursor-pointer p-2 rounded-lg">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteYesOrCancle;
