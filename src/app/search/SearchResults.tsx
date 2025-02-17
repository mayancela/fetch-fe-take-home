"use client";

import React, { useEffect, useState } from "react";
import useDogBreeds from "../hooks/useDogBreeds";
import SelectBreeds from "../components/SelectBreeds";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import useSearchResults from "../hooks/useSearchResults";
import DetailsGrid from "../components/DetailsGrid";

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: allDogBreeds, isLoading, error } = useDogBreeds();

  const {
    // isLoading: isResultsLoading,
    data: dogDetails,
    error: searchResultsError,
  } = useSearchResults(breedsSelected);

  const router = useRouter();

  const handleBreedSelect = (breeds: string[]) => {
    setBreedsSelected(breeds);
  };

  const handleFavoriteSelect = (id: string, liked: boolean) => {
    if (liked) {
      if (!favorites.includes(id)) {
        setFavorites([...favorites, id]);
      }
    } else {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    }
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
      {dogDetails && (
        <DetailsGrid
          dogs={dogDetails}
          handleFavoriteSelect={handleFavoriteSelect}
        />
      )}
    </>
  );
};

export default SearchResults;
