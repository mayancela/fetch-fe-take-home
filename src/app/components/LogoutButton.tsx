import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { HOME_PAGE } from "../../../config";
import useUserAuth from "@/app/hooks/useUserAuth";

const LogoutButton = () => {
  const { logoutUser, isAuthenticated, isLoading, error } = useUserAuth();
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      await logoutUser();

      if (!isAuthenticated && !error) {
        router.push(HOME_PAGE);
      }
    } catch {
      console.error("Logout failed. Please try again"); // to - do update error handling
    }
  };

  return (
    <Button disabled={!!isLoading} onClick={handleOnClick} size="large">
      Logout
    </Button>
  );
};

export default LogoutButton;
