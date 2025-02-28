import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type SelectBreedsProps = {
  allBreeds: string[];
  selectedBreeds: string[];
  onBreedSelect: (selectedBreeds: string[]) => void;
};

const SelectBreeds = ({
  allBreeds,
  selectedBreeds,
  onBreedSelect,
}: SelectBreedsProps) => {
  const handleBreedSelection = (
    event: SelectChangeEvent<typeof selectedBreeds>
  ) => {
    // Ensure `value` is always an array
    const selectedBreeds =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    onBreedSelect(selectedBreeds);
  };

  const handleBreedReset = () => {
    onBreedSelect([]);
  };

  return (
    <FormControl sx={{ width: 275 }}>
      <InputLabel id="select-breed-label">Select Breeds</InputLabel>
      <Select
        labelId="select-breed-label"
        id="select-breed"
        multiple
        value={selectedBreeds}
        onChange={handleBreedSelection}
        input={
          <OutlinedInput id="breed-selection" label="breed-selection-chip" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{ mb: 1 }}
        aria-labelledby="select-breed-label"
        aria-description="Select dog breeds"
      >
        {allBreeds &&
          allBreeds.map((breed: string) => (
            <MenuItem key={`dog-breed-${breed}`} value={breed}>
              {breed}
            </MenuItem>
          ))}
      </Select>
      <Button
        variant="outlined"
        onClick={handleBreedReset}
        disabled={!selectedBreeds.length}
        sx={{ width: "80%", margin: "auto" }}
      >
        Reset Breeds
      </Button>
    </FormControl>
  );
};

export default SelectBreeds;
