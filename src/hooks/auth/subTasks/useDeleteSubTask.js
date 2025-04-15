import * as actions from "./actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const useDeleteSubTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleteSubTaskLoading, mutate: deleteSubTask } =
    useMutation({
      mutationFn: actions.deleteSubTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
      },
    });
  return { isDeleteSubTaskLoading, deleteSubTask };
};

export default useDeleteSubTask;
