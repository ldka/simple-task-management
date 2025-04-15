import * as actions from "./actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useRegister = (data) => {
  const router = useRouter();
  const {
    isPending: isRegisterLoading,
    mutate: register,
    error: error,
    isError: isError,
  } = useMutation({
    mutationFn: actions.register,
    onSuccess: () => {
      alert("Successfully registered account!");
      router.push("/login");
    },
    onError: (error) => { },
  });
  return { isRegisterLoading, register, error, isError };
};

export default useRegister;
