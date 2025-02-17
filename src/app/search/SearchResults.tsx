"use client";

import React, { useEffect, useState } from "react";
import useDogBreeds from "../hooks/useDogBreeds";
import SelectBreeds from "../components/SelectBreeds";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import useSearchResults from "../hooks/useSearchResults";
import DetailsGrid from "../components/DetailsGrid";
import BreedSort from "../components/BreedSort";
import { SortDirection } from "../utils/types";
import { SelectChangeEvent } from "@mui/material/Select";

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: allDogBreeds, isLoading, error } = useDogBreeds();
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const {
    // isLoading: isResultsLoading,
    data: dogDetails,
    error: searchResultsError,
  } = useSearchResults(breedsSelected, sortDirection);

  const router = useRouter();

  console.log("dogDetails", dogDetails);

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

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortDirection(event.target.value as SortDirection); // to-do remove type assertion ?
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
      <BreedSort
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
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
