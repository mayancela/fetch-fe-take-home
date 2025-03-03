export type SortDirectionOptions = "asc" | "desc";

export type SortOptions = "breed" | "name" | "age";

export type AgeGroup = "all" | "puppy" | "adult" | "senior";

export type DogProps = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};
