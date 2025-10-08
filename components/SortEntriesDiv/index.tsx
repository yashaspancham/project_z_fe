"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllEntries } from "@/APIs/Entry/entry";
import SearchEntries from "../SearchEntries";

const SortEntriesOptions = ({
  setEntries,
  setEntriesDetails,
  searchString,
  setSearchString,
  setLoading,
}: any) => {
  const [sort, setSort] = useState("-lastUpdated");
  const [disableSort, setDisableSort] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoaded(true);
    setSort(searchParams.get("sort") || "-lastUpdated");
  }, []);

  const handleSort = (field: "lastUpdated" | "createdAt", order?: "asc" | "desc") => {
    let currentSort = "";

    if (order) {
      currentSort = order === "desc" ? `-${field}` : field;
    } else {
      // fallback for backward compatibility
      if (sort !== field && sort !== `-${field}`) {
        currentSort = `-${field}`;
      } else if (sort === field) {
        currentSort = `-${field}`;
      } else if (sort === `-${field}`) {
        currentSort = field;
      }
    }

    setDisableSort(true);
    setLoading(true);

    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;

    getAllEntries(pageNumber, currentSort, searchString).then((res) => {
      if (res.entries) setEntries(res.entries);
      setEntriesDetails(res);
      setSort(currentSort);
      setDisableSort(false);
      setLoading(false);
    });
  };

  const handleSearchChange = (e: any) => {
    if (e.key === "Enter") {
      const pageStr = searchParams.get("page");
      const pageNumber = pageStr ? Number(pageStr) : 1;
      setLoading(true);

      getAllEntries(pageNumber, sort, e.target.value).then((res) => {
        if (res.entries) setEntries(res.entries);
        setEntriesDetails(res);
        setDisableSort(false);
        setLoading(false);
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const field = value.replace("-", "") as "lastUpdated" | "createdAt";
    const order = value.startsWith("-") ? "desc" : "asc";
    handleSort(field, order);
  };

  return (
    loaded && (
      <div className="md:absolute md:z-10 md:right-40 md:top-20 max-md:mt-10 max-[400px]:mb-5 max-sm:px-2 flex gap-3 items-center justify-center max-[400px]:flex-col">
        <SearchEntries
          searchString={searchString}
          handleSearchChange={handleSearchChange}
          setSearchString={setSearchString}
          focusBorderCss={"focus:ring-blue-500"}
          placeholderString={"🔍 Search entries..."}
        />
        <select
          disabled={disableSort}
          value={sort}
          onChange={handleSelectChange}
          className="text-sm md:text-base border-gray-300 border-1 outline-none rounded-lg px-3 py-2 hover:cursor-pointer shadow-sm"
        >
          <option value="-lastUpdated">Last Updated (Newest first)</option>
          <option value="lastUpdated">Last Updated (Oldest first)</option>
          <option value="-createdAt">Created At (Newest first)</option>
          <option value="createdAt">Created At (Oldest first)</option>
        </select>
      </div>
    )
  );
};

export default SortEntriesOptions;
