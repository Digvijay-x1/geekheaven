import { useQuery } from "@tanstack/react-query";
import { getContent } from "../lib/api";

const useCategoryStore = () => {
    const {data: categories , isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: getContent
    })


    return { categories, isLoading };
};


export default useCategoryStore;