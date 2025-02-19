import fetchData from "../utils/fetchData";
import useSWR from "swr";
import useDogDetails from "./useDogDetails";
import { AgeGroup, SortDirection } from "../utils/types";
import { getAgeGroup } from "../utils/groupAges";

const fetcher = async (path: string) => {
  const result = await fetchData(path, {
    method: "GET",
  });

  return result.json();
};

const useSearchResults = (
  currentPage: number,
  resultsSize: number,
  ageGroup: AgeGroup,
  selectedBreeds?: string[],
  breedSort: SortDirection = "asc"
) => {
  const params = new URLSearchParams();
  const ageValues = getAgeGroup(ageGroup);

  params.append("from", ((currentPage - 1) * resultsSize).toString());

  if (ageValues) {
    params.append("ageMin", ageValues.ageMin.toString());
    params.append("ageMax", ageValues.ageMax.toString());
  }

  if (selectedBreeds && selectedBreeds.length > 0)
    selectedBreeds.map((breed) => params.append("breeds", breed));

  const {
    data: dogIdsData,
    error: dogIdsDataError,
    isLoading: dogIdsDataIsLoading,
  } = useSWR(
    `/dogs/search?size=${resultsSize}&sort=breed:${breedSort}&${params.toString()}`,
    fetcher
  );

  const resultIds = dogIdsData?.resultIds ?? [];

  console.log("resultIDDS", resultIds);

  const { data, error, isLoading } = useDogDetails(resultIds);

  return {
    data,
    error,
    isLoading,
    dogIdsData,
    dogIdsDataError,
    dogIdsDataIsLoading,
  };
};

export default useSearchResults;
