import { useRouter } from "next/navigation";
import useSWR from "swr";
import fetchData from "../utils/fetchData";

const fetcher = async (path: string) => {
  const result = await fetchData(path, { method: "GET" });

  return result.json();
};

const useDogBreeds = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/dogs/breeds", fetcher, {
    onError: (err) => {
      if (err.status === 401) router.push("/");
    },
  });

  return { data, error, isLoading };
};

export default useDogBreeds;
