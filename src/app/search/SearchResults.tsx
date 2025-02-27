"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { HOME_PAGE, LARGE_GAP, RESULTS_SIZE } from "@/utils/config";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import ErrorMessage from "@/components/ErrorMessage";
import SelectBreeds from "@/components/DogBreedsDropdown";
import BreedSort from "@/components/SortDirectionDropdown";
import AgeSelect from "@/components/DogAgeDropdown";
import LogoutButton from "@/components/LogoutButton";
import DetailsGrid from "@/components/DetailsGrid";
import { AgeGroup, SortDirectionOptions } from "@/utils/types";
import useDogBreeds from "@/hooks/useDogBreeds";
import useSearchResults from "@/hooks/useSearchResults";

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortDirection, setSortDirection] =
    useState<SortDirectionOptions>("asc");
  const [ageGroupSelected, setAgeGroupSelected] = useState<AgeGroup>("all");
  const [totalResults, setTotalResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allDogBreeds,
    isLoading: isDogBreedsLoading,
    error: dogBreedsError,
  } = useDogBreeds();

  const {
    isLoading: isDogDetailsLoading,
    data: dogDetails,
    dogIdsData,
    error: dogDetailsError,
  } = useSearchResults(
    currentPage,
    RESULTS_SIZE,
    ageGroupSelected,
    breedsSelected,
    sortDirection
  );

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
    setSortDirection(event.target.value as SortDirectionOptions);
    setCurrentPage(1);
  };

  const handleAgeGroupSelect = (event: SelectChangeEvent) => {
    setAgeGroupSelected(event.target.value as AgeGroup);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleMatchRedirect = () => {
    router.push(`/match?ids=${favorites.join(",")}`);
  };

  useEffect(() => {
    if (dogBreedsError || dogDetailsError) {
      router.push(HOME_PAGE);
    }
  }, [dogBreedsError, router, dogDetailsError]);

  useEffect(() => {
    if (dogIdsData && dogIdsData.total) setTotalResults(dogIdsData.total);
  }, [dogIdsData]);

  if (dogBreedsError || dogDetailsError)
    return <ErrorMessage message={dogBreedsError || dogDetailsError} />;

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h1" sx={{ fontWeight: "600", textAlign: "center" }}>
        Choose Your Favorites
      </Typography>
      {isDogDetailsLoading || isDogBreedsLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "15px" }}>
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
            </Box>

            <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              {favorites.length > 0 && (
                <Typography> {favorites.length} liked </Typography>
              )}
              <Button
                onClick={handleMatchRedirect}
                disabled={!favorites.length}
                size="large"
              >
                Match
              </Button>
              <LogoutButton />
            </Box>
          </Box>
          {dogDetails && (
            <DetailsGrid
              dogs={dogDetails}
              handleFavoriteSelect={handleFavoriteSelect}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              mt: 5,
              mb: 5,
            }}
          >
            <Button
              onClick={handlePrev}
              disabled={currentPage === 1}
              size="small"
            >
              Prev
            </Button>
            <Typography>
              {currentPage} of
              {totalResults && Math.ceil(totalResults / RESULTS_SIZE)}
            </Typography>
            <Button
              onClick={handleNext}
              disabled={
                totalResults &&
                currentPage === Math.ceil(totalResults / RESULTS_SIZE)
              }
              size="small"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
