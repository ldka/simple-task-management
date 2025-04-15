import * as actions from "./actions";
import { useQuery } from "@tanstack/react-query";

const useListSubTask = (taskTitle, params = 1) => {
  const { isPending: isGetSubTaskLoading, data: subTaskList } = useQuery({
    queryKey: ["sub_tasks", taskTitle, `${params}`],
    queryFn: () => actions.listSubTask(taskTitle, params),
  });
  return { isGetSubTaskLoading, subTaskList };
};

export default useListSubTask;
