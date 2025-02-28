import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutButton from "./LogoutButton";
import PetsIcon from "@mui/icons-material/Pets";

const NavBar = () => {
  return (
    <Box sx={{ mb: 2 }} component="nav">
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ff8d8d" }}
        role="banner"
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <PetsIcon
              fontSize="medium"
              sx={{ fill: "#eee" }}
              aria-label="Pet logo"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default NavBar;
