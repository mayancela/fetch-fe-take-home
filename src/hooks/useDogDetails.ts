import fetchData from "../utils/fetchData";
import useSWR from "swr";

const fetcher = async ([path, ids]: [string, number[]]) => {
  const result = await fetchData(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Array.from(new Set([...ids]))), // creating set to remove duplicate IDs
  });

  return result.json();
};

const useDogDetails = (resultIds: string[]) => {
  const { data, error, isLoading } = useSWR(
    resultIds.length > 0 ? ["/dogs", resultIds] : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useDogDetails;
