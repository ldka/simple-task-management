import * as actions from "./actions";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useEditTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isEditTaskLoading, mutate: editTask } = useMutation({
    mutationFn: actions.editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
      alert("Successfully updated task.")
    },
  });
  return { isEditTaskLoading, editTask };
};

export default useEditTask;
