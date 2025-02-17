const BASE_URL = "https://frontend-take-home-service.fetch.com";

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
  });

  return response;
};

export default fetchData;
