"use client";

import React, { useEffect, useState } from "react";
import useDogBreeds from "../hooks/useDogBreeds";
import SelectBreeds from "../components/SelectBreeds";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const SearchResults = () => {
  const [breedsSelected, setBreedsSelected] = useState<string[]>([]);
  const { data: dogBreeds, isLoading, error } = useDogBreeds();
  const router = useRouter();

  console.log(breedsSelected);

  const handleBreedSelect = (breeds: string[]) => {
    setBreedsSelected(breeds);
  };

  useEffect(() => {
    if (error) {
      router.push("/"); //redirect to homepage/login page
    }
  }, [error, router]);

  if (isLoading) return <Box>Loading breeds...</Box>; // to-do: loading spinner
  if (error) return null; // to-do: loading spinner while redirecting

  return <SelectBreeds breeds={dogBreeds} onBreedSelect={handleBreedSelect} />;
};

export default SearchResults;
