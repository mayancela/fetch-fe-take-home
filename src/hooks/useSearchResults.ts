import fetchData from "../utils/fetchData";
import useSWR from "swr";
import useDogDetails from "./useDogDetails";
import { AgeGroup, SortDirectionOptions, SortOptions } from "@/utils/types";
import { getAgeRanges } from "@/utils/groupAges";

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
  sortOption: SortOptions = "breed",
  breedSort: SortDirectionOptions = "asc"
) => {
  const params = new URLSearchParams();
  const ageValues = getAgeRanges(ageGroup);

  params.append("from", ((currentPage - 1) * resultsSize).toString());

  if (ageValues) {
    params.append("ageMin", ageValues.ageMin.toString());
    params.append("ageMax", ageValues.ageMax.toString());
  }

  if (selectedBreeds && selectedBreeds.length > 0)
    selectedBreeds.map((breed) => params.append("breeds", breed));

  console.log(sortOption, breedSort)

  const {
    data: dogIdsData,
    error: dogIdsDataError,
    isLoading: dogIdsDataIsLoading,
  } = useSWR(
    `/dogs/search?size=${resultsSize}&sort=${sortOption}:${breedSort}&${params.toString()}`,
    fetcher
  );

  const resultIds = dogIdsData?.resultIds ?? [];

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
