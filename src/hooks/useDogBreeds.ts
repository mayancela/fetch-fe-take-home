import useSWR from "swr";
import fetchData from "../utils/fetchData";

const fetcher = async (path: string) => {
  const result = await fetchData(path, { method: "GET" });

  return result.json();
};

const useDogBreeds = () => {
  const { data, error, isLoading } = useSWR("/dogs/breeds", fetcher);

  return { data, error, isLoading };
};

export default useDogBreeds;
