import React from "react";
import SearchResults from "./SearchResults";
import Container from "@mui/material/Container";
import styles from "./page.module.css"

export type DogProps = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

const Search = () => {
  return (
    <Container className={styles.page}> 
      <SearchResults />
    </Container>
  )
};

export default Search;
