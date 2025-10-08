import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { getAllEntries } from "@/APIs/Entry/entry";
import { useRouter } from "next/navigation";
import { convertDateToFullString } from "@/utils/date";

type Entry = {
  id: number;
  title: string;
  content: string | null;
  createdAt: string;
  lastUpdated: string;
  url: string | null;
};

type EntriesDetails = {
  clamped: boolean;
  current_page: number;
  entries: Entry[];
  next_page: number | null;
  prev_page: number | null;
  success: boolean;
  total_entries: number;
  total_pages: number;
};

const Entries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const router = useRouter();
  useEffect(() => {
    getAllEntries(1, "-lastUpdated", "").then((res) => {
      if (res.entries) {
        setEntries(res.entries);
      }
    });
  }, []);
  return (
    <div className="w-full">
      {entries.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xl text-emerald-700 font-bold">Recent Entries</p>
          <button
            onClick={() => router.push("/entries")}
            className="flex items-center gap-4 text-md hover:cursor-pointer hover:bg-blue-100 p-2 rounded-lg"
          >
            <p>View All Entries</p>
            <FaArrowRight color="gray" />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-5">
        {entries.map((item, key) => (
          <div
            key={key}
            className="p-5 bg-blue-50 rounded-lg hover:shadow-[2px_4px_1px_0px_rgba(59,130,246,0.75)] transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <p className="text-xl lg:text-2xl">{item?.title}</p>
              <button
                onClick={() => router.push(`/entry?entry_id=${item?.id}`)}
                className="hover:cursor-pointer hover:bg-blue-100 p-2 rounded"
              >
                <FaArrowRight color="blue" />
              </button>
            </div>
            <div className="flex gap-1 items-center">
              <CiCalendar />
              <p className="text-xs  text-gray-600">
                {convertDateToFullString(item.createdAt)}
              </p>{" "}
            </div>
            <p className="text-md text-gray-700 line-clamp-4 mt-5">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entries;
