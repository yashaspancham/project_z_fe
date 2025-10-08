import { CiCalendar } from "react-icons/ci";
import { entryType } from "@/utils/types";
import { convertDateToDayMonthYear } from "@/utils/date";
type EntryCardProps = {
  entry: entryType;
};

const EntryCard = ({ entry }: EntryCardProps) => {
  return (
    <div
      className={`
        flex flex-row md:flex-col gap-3 w-full
        border-b md:border-0 md:max-w-[250px] md:max-h-[450px] md:h-[400px]
         max-md:py-3 md:bg-gray-50 md:rounded-lg
        hover:cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out
      `}
    >
      <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 md:w-[250px] md:h-[200px]">
        <img
          src={!entry.url ? "/defaultImageForEntry.png" : entry.url}
          alt="coverImageForEntry"
          className="rounded-tl-lg rounded-tr-lg object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-1 md:gap-2 flex-1 md:p-3">
        <p className="text-blue-900 text-sm md:text-lg font-bold truncate max-w-[200px] md:max-w-full">
          {entry.title}
        </p>

        <div className="text-xs md:text-sm text-gray-500 flex gap-1 items-center">
          <CiCalendar/>
          {/* <img src={"/icons/calendarBlackIcon.png"} alt="calander icon" className="w-3 h-3"/> */}
          <p>{convertDateToDayMonthYear(entry.createdAt)}</p>
        </div>

        <p className="text-gray-700 text-sm md:text-base max-h-[80px] md:max-h-[100px] overflow-hidden">
          {entry.content}
        </p>
      </div>
    </div>
  );
};
export default EntryCard;
