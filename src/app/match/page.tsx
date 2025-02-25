import React from "react";
import MatchResults from "./MatchResults";
import styles from "./page.module.css"
import Container from "@mui/material/Container";

const MatchPage = () => {
  return (
    <Container className={styles.page}> 
    <MatchResults />
    </Container>
  );
};

export default MatchPage;
