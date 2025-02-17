import React from "react";
import Typography from "@mui/material/Typography";
import LoginFormDialog from "./components/LoginFormDialog";

// React.FC
const Homepage = () => {
  return (
    // replace div w/ box or container?
    <div>
      <Typography variant="h3" component="h1">
        Your future best friend is just a search away. Let’s find them! 🐾
      </Typography>
      {/* todo: add auth logic if already logged in? */}
      <LoginFormDialog />
    </div>
  );
};

export default Homepage;
