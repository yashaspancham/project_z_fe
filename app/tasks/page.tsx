import { Suspense } from "react";
import TasksPageComp from "@/components/TasksPageComp/index";
const TasksPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TasksPageComp />
    </Suspense>
  );
};

export default TasksPage;
