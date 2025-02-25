import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { HOME_PAGE } from "../../../config";
import useUserAuth from "@/app/hooks/useUserAuth";
import ErrorMessage from "./ErrorMessage";

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
      console.error("Error. Please try again.");
    }
  };

  return (
    <>
      <Button disabled={!!isLoading} onClick={handleOnClick} size="large">
        Logout
      </Button>
      {error && <ErrorMessage message="Logout failed. Please try again." />}
    </>
  );
};

export default LogoutButton;
