import { toast } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as actions from "./actions";

const useAddSubTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isAddSubTaskLoading, mutate: addSubTask } = useMutation({
    mutationFn: actions.addSubTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
      alert("Successfully added sub task.");
    },
    onError: (error) => {
      alert("Error adding task, please try again.");
    },
  });
  return { isAddSubTaskLoading, addSubTask };
};

export default useAddSubTask;
