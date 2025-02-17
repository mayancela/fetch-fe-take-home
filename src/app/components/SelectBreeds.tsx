import * as React from "react";
// import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

// to-do: update generic styling
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

// function getStyles(name: string, breedName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: breedName.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

type SelectBreedsProps = {
  breeds: string[];
  onBreedSelect: (selectedBreeds: string[]) => void;
};

const SelectBreeds = ({ breeds, onBreedSelect }: SelectBreedsProps) => {
  // const theme = useTheme();
  const [breedNames, setBreedNames] = React.useState<string[]>([]);

  const handleBreedSelection = (
    event: SelectChangeEvent<typeof breedNames>
  ) => {
    // Ensure `value` is always an array
    const selectedBreeds =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    setBreedNames(selectedBreeds);
    onBreedSelect(selectedBreeds);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-breed-label">Breed</InputLabel>
        <Select
          labelId="select-breed-label"
          id="select-breed"
          multiple
          value={breedNames}
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
        >
          {breeds.map((breed: string) => (
            <MenuItem
              key={`dog-breed-${breed}`}
              value={breed}
              // style={getStyles(breed, breedNames, theme)}
            >
              {breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBreeds;
