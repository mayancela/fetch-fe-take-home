import { SortDirectionOptions, SortOptions } from "@/utils/types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

type SortOptionsDropdownProps = {
  searchFilters: SortOptions; 
  onFilterChange: (event: SelectChangeEvent) => void;
};

const SortOptionsDropdown: React.FC<SortOptionsDropdownProps> = ({
  searchFilters,
  onFilterChange,
}) => {
  return (
    <FormControl sx={{width: 125}}>
      <InputLabel id="sort-direction-label">Sort Results</InputLabel>
      <Select
        labelId="sort-direction-label"
        id="sort-direction-select"
        value={searchFilters}
        label="Filter"
        onChange={onFilterChange}
      >
        <MenuItem value="breed">Breed</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="age">Age</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptionsDropdown;
