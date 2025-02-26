import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoginFormDialog from "@/components/LoginFormDialog";

const Homepage = () => {
  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        rowGap: "2em",
      }}
    >
      <Typography variant="h3" component="h1">
        Your future best friend is just a search away. Let’s find them! 🐾
      </Typography>
      <LoginFormDialog />
    </Box>
  );
};

export default Homepage;
