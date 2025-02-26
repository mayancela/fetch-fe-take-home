import useSWR from "swr";
import fetchData from "../utils/fetchData";

const fetcher = async ([path, ids]: [string, string[]]) => {
  const result = await fetchData(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Array.from(new Set([...ids]))), // creating set to remove duplicate IDs
  });

  return result.json();
};

const useDogMatch = (ids: string[]) => {
  const { data, error, isLoading } = useSWR(["/dogs/match", ids], fetcher);

  return { data, error, isLoading };
};

export default useDogMatch;
