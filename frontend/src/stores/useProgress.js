import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProgress, updateProgress } from "../lib/api";
import toast from "react-hot-toast";


const useProgress = () => {
    const queryClient = useQueryClient();

    const { data: progress } = useQuery({
        queryKey: ["progress"],
        queryFn: getProgress
    });

    const { mutate: progressMutate } = useMutation({
        mutationFn: updateProgress,
        onSuccess: () => {
            queryClient.invalidateQueries(["progress"]);
        },
        onError: (error) => {
            if(error.response?.status === 401) {
                toast.error("Login to save progress")
            }
        }
    });

    return { progressMutate, progress };
};

export default useProgress;
