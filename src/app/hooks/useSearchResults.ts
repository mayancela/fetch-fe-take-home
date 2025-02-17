import fetchData from "../utils/fetchData";
import useSWR from "swr";
import useDogDetails from "./useDogDetails";
import { SortDirection } from "../utils/types";

const fetcher = async (path: string) => {
  const result = await fetchData(path, {
    method: "GET",
  });

  return result.json();
};

const useSearchResults = (
  selectedBreeds?: string[],
  breedSort: SortDirection = "asc"
) => {
  const params = new URLSearchParams();

  if (selectedBreeds)
    selectedBreeds.map((breed) => params.append("breeds", breed));

  const {
    data: dogIds,
    error: dogIdsError,
    isLoading: dogIdsIsLoading,
  } = useSWR(
    `/dogs/search?sort=breed:${breedSort}&${params.toString()}`,
    fetcher
  );

  const resultIds = dogIds?.resultIds ?? [];

  const { data, error, isLoading } = useDogDetails(resultIds);

  return {
    data,
    error,
    isLoading,
    dogIds,
    dogIdsError,
    dogIdsIsLoading,
  };
};

export default useSearchResults;
