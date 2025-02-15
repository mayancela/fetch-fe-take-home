"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CustomModal from "./CustomModal"; // barrel imports?
import { Container, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

const LoginModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Container>
      <Button size="large" variant="contained" onClick={handleOpen}>
        Log in
      </Button>
      <CustomModal
        open={openModal}
        onClose={handleClose}
        ariaLabel="Login"
        ariaDescription="Login modal"
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <LoginForm />
      </CustomModal>
    </Container>
  );
};

export default LoginModal;

// to-do: update styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
