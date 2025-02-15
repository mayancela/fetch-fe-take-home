"use client";

import React, { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import userAuth from "../utils/userAuth";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await userAuth(name, email);
      console.log("res ", res);
      // to-do: add routing to /search
    } catch (e) {
      setError("Auth failed.. Please try again."); // to-do: update error handling
    } finally {
      setIsLoading(false);
    }

    setName("");
    setEmail("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {!isLoading ? (
        <>
          <TextField
            label="Name"
            variant="standard"
            type="text"
            onChange={(e) => setName(e.target.value)} // to-do: could add extra validation for only letter inputs
            autoFocus={!!error}
            required
          />
          <TextField
            label="Email"
            variant="standard"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit"> Paw-ceed! // Let&apos;s go!</Button>
        </>
      ) : (
        <Typography variant="body1"> Loading... </Typography> // to-do: loading spinner?
      )}
    </Box>
  );
};

export default LoginForm;
