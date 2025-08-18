import { useQuery } from "@tanstack/react-query";
import { getContent, SuperContentSearch } from "../lib/api";


const useCategoryStore = ({ search = "", difficulty = "", page = 1 } = {}) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getContent
  });

    const { data: query, isLoading: IsQueryLoading } = useQuery({
    queryKey: ["queryKey", { search, difficulty, page }],
    queryFn: SuperContentSearch,
    enabled: !!search,
  });

  return { categories, isLoading, query, IsQueryLoading };
};

export default useCategoryStore;

