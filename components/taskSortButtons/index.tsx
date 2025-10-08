"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { getTasks } from "@/APIs/Task/task";
import SearchEntries from "../SearchEntries";
import TaskFilter from "../TasksFilter";

const TaskSortButtons = ({
  setTasks,
  setTaskDetails,
  setLoading,
  searchString,
  setSearchString,
  statusFilter,
  setStatusFilter,
}: any) => {
  const [sort, setSort] = React.useState("-lastUpdated");
  const [loaded, setLoaded] = React.useState(false);
  const [disableSort, setDisableSort] = React.useState(false);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    setLoaded(true);
    setSort(searchParams.get("sort") || "-lastUpdated");
  }, []);

  const handleSort = (field: "lastUpdated" | "createdAt" | "dueDate", order?: "asc" | "desc") => {
    let currentSort = order ? (order === "desc" ? `-${field}` : field) : `-${field}`;

    setDisableSort(true);
    setLoading(true);

    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    getTasks(pageNumber, currentSort, search, status).then((res) => {
      if (res.success) {
        setTasks(res.tasks);
        setTaskDetails(res);
      }
      setSort(currentSort);
      setDisableSort(false);
      setLoading(false);
    });
  };

  const handleSearchChange = (e: any) => {
    if (e.key === "Enter") {
      const pageStr = searchParams.get("page");
      const pageNumber = pageStr ? Number(pageStr) : 1;
      const status = searchParams.get("status") || "";
      setLoading(true);

      getTasks(pageNumber, sort, e.target.value, status).then((res) => {
        if (res.success) {
          setTasks(res.tasks);
          setTaskDetails(res);
        }
        setDisableSort(false);
        setLoading(false);
      });
    }
  };

  const handleStatusFilter = (status: string) => {
    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;
    const search = searchParams.get("search") || "";
    setLoading(true);

    getTasks(pageNumber, sort, search, status).then((res) => {
      if (res.success) {
        setTasks(res.tasks);
        setTaskDetails(res);
      }
      setDisableSort(false);
      setLoading(false);
    });

    setStatusFilter(status);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const field = value.replace("-", "") as "lastUpdated" | "createdAt" | "dueDate";
    const order = value.startsWith("-") ? "desc" : "asc";
    handleSort(field, order);
  };

  return (
    loaded && (
      <div className="w-full flex max-md:flex-col gap-2 justify-end items-center py-4 px-20">
        <SearchEntries
          searchString={searchString}
          setSearchString={setSearchString}
          handleSearchChange={handleSearchChange}
          focusBorderCss={"focus:ring-blue-500"}
          placeholderString={"🔍 Search Tasks"}
        />
        <TaskFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          handleStatusFilter={handleStatusFilter}
        />
        <select
          disabled={disableSort}
          value={sort}
          onChange={handleSelectChange}
          className="text-sm md:text-base border-gray-300 border-1 outline-none rounded-lg px-3 py-2 hover:cursor-pointer bg-white"
        >
          <option value="-dueDate">Due Date (Newest first)</option>
          <option value="dueDate">Due Date (Oldest first)</option>
          <option value="-createdAt">Created At (Newest first)</option>
          <option value="createdAt">Created At (Oldest first)</option>
          <option value="-lastUpdated">Last Updated (Newest first)</option>
          <option value="lastUpdated">Last Updated (Oldest first)</option>
        </select>
      </div>
    )
  );
};

export default TaskSortButtons;
