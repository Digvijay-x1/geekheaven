import { useQuery } from "@tanstack/react-query";
import { getContent, SuperContentSearch } from "../lib/api";
import toast from "react-hot-toast";

const useCategoryStore = (search) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getContent
  });

  const { data: query, isLoading: IsQueryLoading } = useQuery({
    queryKey: ["queryKey", { search }], 
    queryFn: SuperContentSearch,
    enabled: !!search, 
    onSuccess: (data) => {
      console.log("the queries are", data);
    },
    onError: () => {
      toast.error("Invalid Query");
    }
  });

  return { categories, isLoading, query, IsQueryLoading };
};

export default useCategoryStore;
