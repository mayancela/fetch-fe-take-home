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
import { AgeGroup, SortDirection } from "../utils/types";
import { SelectChangeEvent } from "@mui/material/Select";
import AgeSelect from "../components/AgeSelect";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RESULTS_SIZE = 30;

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [ageGroupSelected, setAgeGroupSelected] = useState<AgeGroup>("all");
  const [totalResults, setTotalResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allDogBreeds, isLoading, error } = useDogBreeds();

  const {
    // isLoading: isResultsLoading,
    data: dogDetails,
    dogIdsData,
    error: searchResultsError,
  } = useSearchResults(
    currentPage,
    RESULTS_SIZE,
    ageGroupSelected,
    breedsSelected,
    sortDirection
  );

  console.log(dogDetails, dogIdsData);

  const router = useRouter();

  const handleBreedSelect = (breeds: string[]) => {
    setBreedsSelected(breeds);
    setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const handleAgeGroupSelect = (event: SelectChangeEvent) => {
    setAgeGroupSelected(event.target.value as AgeGroup); // to-do remove type assertion ?
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (error || searchResultsError) {
      router.push("/"); //redirect to homepage/login page
    }
  }, [error, router, searchResultsError]);

  useEffect(() => {
    if (dogIdsData && dogIdsData.total) setTotalResults(dogIdsData.total);
  }, [dogIdsData]);

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
      <AgeSelect
        ageSelected={ageGroupSelected}
        onAgeSelectedChange={handleAgeGroupSelect}
      />
      <LogoutButton />
      {favorites.length > 0 && (
        <Typography> {favorites.length} liked </Typography>
      )}
      {dogDetails && (
        <DetailsGrid
          dogs={dogDetails}
          handleFavoriteSelect={handleFavoriteSelect}
        />
      )}
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </Button>
      <Typography>
        {currentPage} of{" "}
        {totalResults && Math.ceil(totalResults / RESULTS_SIZE)}
      </Typography>
      <Button
        onClick={handleNext}
        disabled={
          totalResults && currentPage === Math.ceil(totalResults / RESULTS_SIZE)
        }
      >
        Next
      </Button>
    </>
  );
};

export default SearchResults;
