import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, logout } from "../lib/api";
import { toast } from "react-hot-toast";

const useAuthStore = () => {
  const queryClient = useQueryClient();

  // Auth user query
  const { data: authdata } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserData,
    retry: false, // don't retry if not logged in
  });

  const authUser = authdata?.user;

  // Logout mutation
  const { mutate: logoutMutation, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // clear cached user
      queryClient.setQueryData(["authUser"], null); 
      // invalidate the query 
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return {
    authUser,
    logout: logoutMutation,
    isLoggingOut,
  };
};

export default useAuthStore;
