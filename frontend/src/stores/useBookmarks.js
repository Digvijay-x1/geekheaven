import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookmarks, updateBookmarks } from "../lib/api";


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
        }
    });

    return { bookmarkMutate, bookmarks };
};

export default useBookmarks;
