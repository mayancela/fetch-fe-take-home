import React from "react";
import SearchResults from "./SearchResults";
import Container from "@mui/material/Container";
import styles from "./page.module.css";

const Search = () => {
  return (
    <Container className={styles.page}>
      <SearchResults />
    </Container>
  );
};

export default Search;
