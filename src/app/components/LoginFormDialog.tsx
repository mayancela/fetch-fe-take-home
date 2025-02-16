"use client";

import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import userAuth from "../utils/userAuth";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

const LoginFormDialog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await userAuth(name, email);
      if (res.success) push("/search");
    } catch (error) {
      setErrorMessage("Authentication failed. Please try again."); // to-do: update error handling?
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }

    setName("");
    setEmail("");
  };

  return (
    <Container>
      <Button size="large" variant="contained" onClick={handleOpen}>
        Log in
      </Button>
      <Dialog
        open={openModal}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle> Login </DialogTitle>
        <DialogContent>
          {!isLoading ? (
            <>
              <DialogContentText>
                Enter name and email to being searching
              </DialogContentText>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  variant="standard"
                  type="text"
                  onChange={(e) => setName(e.target.value)} // to-do: could add extra validation for only letter inputs
                  autoFocus={!!errorMessage}
                  required
                />
                <TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errorMessage && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
              </Stack>
            </>
          ) : (
            <Typography variant="body1"> Loading... </Typography> // to-do: loading spinner? https://loading.io/
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={!!isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={!!isLoading}>
            Paw-ceed! // Let&apos;s go! {/* choose one */}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoginFormDialog;
