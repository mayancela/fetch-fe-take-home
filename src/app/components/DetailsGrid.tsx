import Grid2 from "@mui/material/Grid2";
import React from "react";
import { DogProps } from "../search/page";
import DetailsCard from "./DetailsCard";

type DetailsGridProps = {
  dogs: DogProps[];
  handleFavoriteSelect: (id: string, liked: boolean) => void;
};

// favorites list?
const DetailsGrid = ({ dogs, handleFavoriteSelect }: DetailsGridProps) => {
  return (
    <Grid2 container spacing={2}>
      {dogs.map(({ id, age, img, breed, name, zip_code }) => {
        return (
          <DetailsCard
            key={`card-${id}`}
            id={id}
            age={age}
            img={img}
            breed={breed}
            name={name}
            zip_code={zip_code}
            handleFavoriteSelect={handleFavoriteSelect}
          />
        );
      })}
    </Grid2>
  );
};

export default DetailsGrid;
