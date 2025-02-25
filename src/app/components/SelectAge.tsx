import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { AgeGroup } from "../utils/types";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

type AgeSelectProps = {
  ageSelected: AgeGroup;
  onAgeSelectedChange: (event: SelectChangeEvent) => void;
};
const AgeSelect: React.FC<AgeSelectProps> = ({
  ageSelected = "all",
  onAgeSelectedChange,
}) => {
  return (
    <Box>
      <FormControl>
        <InputLabel id="age-select-label">Age</InputLabel>
        <Select
          labelId="age-select-label"
          id="age-select"
          value={ageSelected}
          label="Age"
          onChange={onAgeSelectedChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="puppy">Puppy</MenuItem>
          <MenuItem value="adult">Adult</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AgeSelect;
