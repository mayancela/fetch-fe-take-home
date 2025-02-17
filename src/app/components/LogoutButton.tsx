import React from "react";
import useUserAuth from "../hooks/useUserAuth";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logoutUser, isAuthenticated, isLoading, error } = useUserAuth();
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      await logoutUser();

      if (!isAuthenticated && !error) {
        router.push("/");
      }
    } catch {
      console.error("Logout failed. Please try again"); // to - do update error handling
    }
  };

  return (
    <Button disabled={!!isLoading} onClick={handleOnClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
