import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookmarks, updateBookmarks } from "../lib/api";
import toast from "react-hot-toast";




const useBookmarks = () => {
    const queryClient = useQueryClient();

    const { data: bookmarks } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: getBookmarks
    });

    

    const { mutate: bookmarkMutate } = useMutation({
        mutationFn: updateBookmarks,
        onSuccess: () => {
            queryClient.invalidateQueries(["bookmarks"]);
        },
        onError: (error) => {
            if(error.response?.status === 401) {
                toast.error("Please login in to bookmark")
            }
        }
    });

    return { bookmarkMutate, bookmarks };
};

export default useBookmarks;
