import * as actions from "./actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleteTaskLoading, mutate: deleteTask } =
    useMutation({
      mutationFn: actions.deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  return { isDeleteTaskLoading, deleteTask };
};

export default useDeleteTask;
