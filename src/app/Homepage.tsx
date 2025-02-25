import React from "react";
import Typography from "@mui/material/Typography";
import LoginFormDialog from "./components/LoginFormDialog";
import Box from "@mui/material/Box";

const Homepage = () => {
  return (
    <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', rowGap: '2em'}}>
      <Typography variant="h3" component="h1">
        Your future best friend is just a search away. Let’s find them! 🐾
      </Typography>
      {/* todo: add auth logic if already logged in? */}
      <LoginFormDialog />
    </Box>
  );
};

export default Homepage;
