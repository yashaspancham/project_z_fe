import { toasting } from "@/utils/toast"
import { api } from "@/APIs/setUp/setup";

export const entriesStats = async () => {
  try {
    const response = await api.get("journal/entry_stats/");
    const returnData = {
      "Total Entries": { "subText": "This Week", "value": response.data["entries_this_week"] },
      "Total Words": { "subText": "This Week", "value": response.data["total_words_this_week"] },
      "Total letters": { "subText": "This Week", "value": response.data["total_letters_this_week"] },
      "Average Words": { "subText": "This Week", "value": response.data["average_words_per_entry_this_week"] },
      "Current streak": { "subText": "This Week", "value": response.data["Current_streak"] },
      "Longest streak": { "subText": "This Week", "value": response.data["longest_streak"] },
    }
    return returnData;
  } catch (err) {
    toasting(`Error obtaining Stats: ${err}`, "error");
    return false;
  }
};


export const tasksStats = async () => {
  try {
    const response = await api.get("tasks/get_task_stats/");
    const returnData = {
      "Tasks Completed": { "subText": "This Week", "value": response.data["tasks_completed_this_week"] },
      "Tasks in-progress": { "subText": "This Week", "value": response.data["tasks_in_progress"] },
      "Tasks Due": { "subText": "This Week", "value": response.data["tasks_due_this_week"] },
    }
    return returnData;
  } catch (err) {
    toasting(`Error obtaining Stats: ${err}`, "error");
    return false;
  }
};
