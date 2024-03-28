import React, { FormEvent } from "react";
import { Select, Stack } from "@chakra-ui/react";
import { AllowedSort, AllowedOrder } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import {
  changeSort,
  changeOrder,
} from "../features/paramSettings/paramSettingsSlice";

const SearchFilterBar = () => {
  // RTK hooks to call and use global paramter settings state
  const params = useSelector((state: RootState) => state.paramSettings);
  const dispatch = useDispatch();

  // Store the sort and order options in an array to quickly update the dropdown list
  const sortByOptions: AllowedSort[] = [
    "stars",
    "forks",
    "help-wanted-issues",
    "updated",
  ];
  const orderByOptions: AllowedOrder[] = ["desc", "asc"];

  /* Best match sorting criteria is tricky with the API, its value is registered as undefined, 
  so it is handled differently from the other options, finally capitalize the first letter from
  the array to have it displayed more accurately */
  const capitalizeFirstLetter = (word: string | undefined): string => {
    return word === undefined
      ? "Best Match"
      : word.charAt(0).toUpperCase() + word.slice(1);
  };

  /* Consolidated the handle into a single function to keep code DRY, 
  both handlers want to change the same global parameter settings */
  const handleChange = async (e: FormEvent) => {
    const { value } = e.target as HTMLSelectElement;

    if (orderByOptions.includes(value as AllowedOrder)) {
      dispatch(changeOrder(value as AllowedOrder));
    } else {
      dispatch(changeSort(value as AllowedSort));
    }
  };

  return (
    <>
      <Stack direction="row" marginTop="0.25em">
        <Select defaultValue={params.sort} width="25%" onChange={handleChange}>
          <option hidden disabled value="">
            Sort By
          </option>
          <option value={undefined}>Best Match</option>
          {sortByOptions.map((option, i) => (
            <option key={`SortBy-${i}`} value={option}>
              {capitalizeFirstLetter(option)}
            </option>
          ))}
        </Select>
        <Select
          defaultValue={params.order}
          width="25%"
          onChangeCapture={handleChange}
        >
          <option hidden disabled value="">
            Order By
          </option>
          {orderByOptions.map((option, i) => (
            <option key={`OrderBy-${i}`} value={option}>
              {capitalizeFirstLetter(option) + "ending"}
            </option>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default SearchFilterBar;
