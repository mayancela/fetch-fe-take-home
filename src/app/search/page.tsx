import React from "react";
import SearchResults from "./SearchResults";

export type DogProps = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

const Search = () => {
  return <SearchResults />;
};

export default Search;
