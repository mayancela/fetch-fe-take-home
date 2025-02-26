import { SortDirectionOptions } from "@/utils/types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

type BreedSortProps = {
  sortDirection: SortDirectionOptions; 
  onSortChange: (event: SelectChangeEvent) => void;
};

const BreedSort: React.FC<BreedSortProps> = ({
  sortDirection = "asc",
  onSortChange,
}) => {
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
