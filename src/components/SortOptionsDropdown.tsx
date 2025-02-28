import { SortOptions } from "@/utils/types";
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
    <FormControl sx={{ width: 125 }} aria-label="Sort options control">
      <InputLabel id="sort-options-label">Sort Results</InputLabel>
      <Select
        labelId="sort-options-label"
        id="sort-options-select"
        value={searchFilters}
        label="Filter"
        onChange={onFilterChange}
        aria-labelledby="sort-options-label"
        aria-description="Select criteria to sort dog results"
      >
        <MenuItem value="breed">Breed</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="age">Age</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptionsDropdown;
