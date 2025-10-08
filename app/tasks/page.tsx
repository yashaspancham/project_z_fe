import { Suspense } from "react";
import TasksPageComp from "@/components/TasksPageComp/index";
import SuspenseLoading from "@/components/SuspenseLoading";

const TasksPage = () => {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <TasksPageComp />
    </Suspense>
  );
};

export default TasksPage;
