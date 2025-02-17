import { useState } from "react";
import fetchData from "../utils/fetchData";

const useUserAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loginUser = async (name: string, email: string) => {
    setIsLoading(true);

    try {
      const result = await fetchData("/auth/login", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        setError(true);
        return;
      }

      setIsAuthenticated(true);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);

    try {
      const result = await fetchData("/auth/logout", {
        method: "POST",
      });

      if (!result.ok) {
        setError(true);
        return;
      }

      setIsAuthenticated(false);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, logoutUser, isAuthenticated, isLoading, error };
};

export default useUserAuth;
