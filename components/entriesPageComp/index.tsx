"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EntryCard from "@/components/EntryCard";
import SideBarMenu from "@/components/SideBarMenu";
import AddEntryButton from "@/components/addEntryButton";
import SortEntriesOptions from "@/components/SortEntriesDiv";
import PagesNavEntries from "@/components/EntriesPageNav";
import { getAllEntries } from "@/APIs/Entry/entry";
import LoadingEntries from "@/components/loadingEntries";

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

const EntriesPageComp = () => {
  const [loaded, setLoaded] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [searchString, setSearchString] = useState("");
  const [entriesDetails, setEntriesDetails] = useState<EntriesDetails>(
    {} as EntriesDetails
  );
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    onLoadFunction();
  }, []);

  const onLoadFunction = async () => {
    let pageNumber: number;
    const pageNumberStr = searchParams.get("page") || "1";
    const searchString = searchParams.get("search") || "";
    const sortOnLoad = searchParams.get("sort") || "-lastUpdated";

    pageNumber = pageNumberStr ? Number(pageNumberStr) : 1;

    setLoading(true);

    const res = await getAllEntries(pageNumber, sortOnLoad, searchString);

    if (res.entries) {
      setEntries(res.entries);
    }
    setEntriesDetails(res);
    setLoading(false);
    setLoaded(true);
  };

  return (
    loaded && (
      <main className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <SortEntriesOptions
          searchString={searchString}
          setSearchString={setSearchString}
          setEntries={setEntries}
          setEntriesDetails={setEntriesDetails}
          setLoading={setLoading}
        />
        <div className="md:mt-[100px] max-md:mb-[200px] z-1 default flex flex-col h-full w-full items-center justify-center xl:p-20 lg:p-16 md:p-12 sm:p-8">
          {loading ? (
            <LoadingEntries />
          ) : (
            <>
              <div className="mb-[100px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-8 md:place-items-center">
                {entries.length === 0 ? (
                  <p>No entries</p>
                ) : (
                  entries.map((item: Entry, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        window.location.href = `/entry?entry_id=${item.id}`;
                      }}
                    >
                      <EntryCard entry={item} />
                    </div>
                  ))
                )}
              </div>
              {entries.length > 0 && (
                <PagesNavEntries entriesDetails={entriesDetails} />
              )}
            </>
          )}
        </div>
        <AddEntryButton />
      </main>
    )
  );
};

export default EntriesPageComp;
