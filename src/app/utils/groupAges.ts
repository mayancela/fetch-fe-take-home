import { AgeGroup } from "./types";

export const getAgeGroup = (
  ageGroup: AgeGroup
): { ageMin: number; ageMax: number } | undefined => {
  if (ageGroup === "puppy") {
    return { ageMin: 0, ageMax: 2 };
  } else if (ageGroup === "adult") {
    return { ageMin: 3, ageMax: 9 };
  } else if (ageGroup === "senior") {
    return { ageMin: 10, ageMax: 25 };
  }
  return undefined;
};
