"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import useUserAuth from "@/app/hooks/useUserAuth";
import ErrorMessage from "./ErrorMessage";

const LoginFormDialog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { push } = useRouter();
  const { loginUser, isLoading, isAuthenticated, error } = useUserAuth();

  const handleOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await loginUser(name, email);

    setName("");
    setEmail("");
  };

  useEffect(() => {
    if (isAuthenticated && !error) {
      handleModalClose();
      push("/search"); 
    } else if (error)
      setErrorMessage("Authentication failed. Please try again.");
  }, [isAuthenticated, error, push]);


  return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
     { isLoading ? <CircularProgress /> :
     <>
     <Button size="large" variant="contained" onClick={handleOpen} disabled={isLoading}>
        Get started
      </Button>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle> Being searching </DialogTitle>
        <DialogContent>
              <DialogContentText>
                Enter name and email to view available dogs
              </DialogContentText>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  variant="standard"
                  type="text"
                  onChange={(e) => setName(e.target.value)} // to-do: could add extra validation for only letter inputs
                  autoFocus={!!errorMessage}
                  required
                  fullWidth
                  sx={{pt: '10px'}}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{pt: '10px'}}
                  required
                />
                {errorMessage && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
              </Stack>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', gap: '1em'}}>
          <Button onClick={handleModalClose} disabled={!!isLoading} size="small">
            Cancel
          </Button>
          <Button type="submit" disabled={!!isLoading} size="small">
            Paw-ceed 
          </Button>
        </DialogActions>
      </Dialog>
     </>
     }
    </Container>
  );
};

export default LoginFormDialog;
