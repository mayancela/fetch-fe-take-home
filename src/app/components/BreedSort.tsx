import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { SortDirection } from "../utils/types";

type BreedSortProps = {
  sortDirection: SortDirection; // to-do: change to SortDirectionOptions
  onSortChange: (event: SelectChangeEvent) => void;
};

const BreedSort = ({ sortDirection = "asc", onSortChange }: BreedSortProps) => {
  return (
    <FormControl>
      <InputLabel id="sort-direction-label">Sort</InputLabel>
      <Select
        labelId="sort-direction-label"
        id="sort-direction-select"
        value={sortDirection}
        label="Sort"
        onChange={onSortChange}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BreedSort;
