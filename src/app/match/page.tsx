import React from "react";
import MatchResults from "./MatchResults";
import styles from "./page.module.css";
import Container from "@mui/material/Container";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const MatchPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Container className={styles.page}>
        <MatchResults />
      </Container>
    </Suspense>
  );
};

export default MatchPage;
