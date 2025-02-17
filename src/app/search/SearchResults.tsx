"use client";

import React, { useEffect, useState } from "react";
import useDogBreeds from "../hooks/useDogBreeds";
import SelectBreeds from "../components/SelectBreeds";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import useSearchResults from "../hooks/useSearchResults";

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const { data: allDogBreeds, isLoading, error } = useDogBreeds();

  const {
    // isLoading: isResultsLoading,
    data: dogDetails,
    error: searchResultsError,
  } = useSearchResults(breedsSelected);

  const router = useRouter();

  console.log("dogDetails", dogDetails);

  const handleBreedSelect = (breeds: string[]) => {
    setBreedsSelected(breeds);
  };

  useEffect(() => {
    if (error || searchResultsError) {
      router.push("/"); //redirect to homepage/login page
    }
  }, [error, router, searchResultsError]);

  if (isLoading) return <Box>Loading breeds...</Box>; // to-do: loading spinner
  //   if (isResultsLoading) return <Box>Loading results...</Box>; // to-do: loading spinner
  if (error || searchResultsError) return null; // to-do: loading spinner while redirecting

  return (
    <>
      <SelectBreeds
        allBreeds={allDogBreeds}
        selectedBreeds={breedsSelected}
        onBreedSelect={handleBreedSelect}
      />
      <LogoutButton />
    </>
  );
};

export default SearchResults;
