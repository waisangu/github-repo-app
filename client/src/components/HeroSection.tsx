import React, { KeyboardEvent, useState } from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { changeQ } from "../features/paramSettings/paramSettingsSlice";
import SearchResultCard from "./SearchResultCard";
import { IApiResponse } from "../types/octokit";
import SearchFilterBar from "./SearchFilterBar";
import Pagination from "./Pagination";
import { fetchApi } from "../utils/fetchApi";
import SearchResultAlert from "./SearchResultAlert";

const HeroSection = () => {
  // RTK hooks to call and use global paramter settings state
  const params = useSelector((state: RootState) => state.paramSettings);
  const dispatch = useDispatch();

  // Initially total count has to be -1 for the conditional rendering logic
  const [repos, setRepos] = useState<IApiResponse>({
    total_count: -1,
    incomplete_results: true,
    items: [],
  });

  // Reuse function for both handleKeyDown and handleOnClick
  const fetchUpdateRepo = async ():Promise<void> => {
    try {
      const results = await fetchApi(params, "/search/repositories", "GET");
      // Only update state of repos if fetch from API returns json, else do nothing
      if (results) {
        setRepos(results);
      }
    } catch (error) {
      return console.log(error);
    }
  }

  // Handles entering the input with Enter key instead of clicking Search button
  const handleKeyDown = async (e: KeyboardEvent) => {
    if ((e as KeyboardEvent).key === "Enter") {
      fetchUpdateRepo()
  };

  const handleOnClick = async (): Promise<void> => {
    fetchUpdateRepo()
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search for GitHub Repository"
          onChange={(e) => dispatch(changeQ(e.target.value))}
          onKeyDown={handleKeyDown}
        />
        <InputRightAddon p={0}>
          <Button borderLeftRadius={0} onClick={handleOnClick}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      <SearchFilterBar />
      {/* Only renders if API returns one or more items */}
      {repos.total_count > 0 &&
        repos.items.map((repo) => {
          return <SearchResultCard key={`${repo.id}`} result={repo} />;
        })}
      {/* Error component if API returns nothing from search */}
      {repos.total_count === 0 && <SearchResultAlert />}
      {/* Only renders if API returns one or more items */}
      {repos.total_count > 0 && (
        <Pagination
          setRepos={setRepos}
          /* Calculates the total pages to display */
          totalPages={Math.ceil(repos.total_count / params.per_page)}
        />
      )}
    </>
  );
};

export default HeroSection;
