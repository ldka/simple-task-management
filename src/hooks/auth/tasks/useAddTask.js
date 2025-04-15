import { toast } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as actions from "./actions";

const useAddTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isAddTaskLoading, mutate: addTask } = useMutation({
    mutationFn: actions.addTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
      alert("Successfully added task.");
    },
    onError: (error) => {
      console.log(error.response.data.message.title[0]);
      alert(error.response.data.message.title[0]);
    },
  });
  return { isAddTaskLoading, addTask };
};

export default useAddTask;
