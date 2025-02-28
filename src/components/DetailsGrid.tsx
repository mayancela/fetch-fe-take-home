import Grid2 from "@mui/material/Grid2";
import React from "react";
import DetailsCard from "./DetailsCard";
import { DogProps } from "@/utils/types";

type DetailsGridProps = {
  dogs: DogProps[];
  handleFavoriteSelect: (id: string, liked: boolean) => void;
};

const DetailsGrid: React.FC<DetailsGridProps> = ({
  dogs,
  handleFavoriteSelect,
}) => {
  return (
    <Grid2 container spacing={2} justifyContent="center">
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
