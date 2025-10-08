import Image from "next/image";
import { getColorForTask } from "@/utils/getColorForTaskCard";
import {convertDateToDayMonthYear} from "@/utils/date";
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";


const TaskComponent = ({
  item,
  setSelectedTask,
  setEntryID,
  handleConfirmDeletePopUp,
}: any) => {
  return (
    <div
      className={`p-4 ${getColorForTask(
        item.status,
        item.dueDate
      )} rounded-lg w-[200px] h-[200px] hover:shadow-md transition-shadow duration-300 ease-in-out flex flex-col`}
    >
      <p className="text-gray-900 h-[100px] max-h-[100px] overflow-hidden">
        {item.description}
      </p>
      <p className="text-xs text-gray-500 flex gap-2 items-center">
        <CiCalendar/> {convertDateToDayMonthYear(item.createdAt)}
      </p>
      <p className="text-xs text-gray-500 flex gap-2 items-center">
        <CiClock2/> {convertDateToDayMonthYear(item.dueDate)}
      </p>
      <div className="flex gap-1 self-end mt-auto">
        <button
          onClick={() => setSelectedTask(item)}
          className="hover:cursor-pointer hover:bg-gray-200 text-white w-fit p-1.5 rounded-lg"
        >
          <Image
            src={"/icons/updateTask.png"}
            alt="edit Icon"
            width={20}
            height={20}
          />
        </button>
        <button
          onClick={() => {
            setEntryID(item.id);
            handleConfirmDeletePopUp();
          }}
          className="hover:cursor-pointer hover:bg-gray-200 text-white w-fit p-1.5 rounded-lg"
        >
          <Image
            src={"/icons/deleteEntryLogo.png"}
            alt="delete Icon"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;
