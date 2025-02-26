import fetchData from "./fetchData";

const fetchDogMatch = async (path: string, dogIds: string[]) => {
  const response = await fetchData(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Array.from(new Set([...dogIds]))), // creating set to remove duplicate IDs
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog matches");
  }

  return response.json();
};

export default fetchDogMatch;
