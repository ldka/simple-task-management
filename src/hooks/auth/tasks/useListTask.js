import { listProduct, listTask } from "./actions";
import { useQuery } from "@tanstack/react-query";

const useListTask = (params = 1) => {
  const { isPending: isGetTaskLoading, data: taskList } = useQuery({
    queryKey: ["tasks", `${params}`],
    queryFn: () => listTask(params),
  });
  return { isGetTaskLoading, taskList };
};

export default useListTask;
