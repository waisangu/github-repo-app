import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import FavoriteRepoCard from "./FavoriteRepoCard";
import { IServerResponseItem } from "../types/types";
import PaginationFavs from "./PaginationFavs";

const FavoritesPage = () => {
  // React Router hook to fetch the database prior to fully loading page
  const currentRepos = useLoaderData() as IServerResponseItem[];

  // Keep track of the repositories in the database to quickly rerender list on unsave
  const [repos, setRepos] = useState<IServerResponseItem[]>(currentRepos);

  const [page, setPage] = useState<number>(1);
  const perPage: number = 10;

  // Retrieves the global count of favorite repositories
  const currentCount: number = useSelector(
    (state: RootState) => state.favCounter.value
  );

  // Rerender the total count of favorited repositories anytime the repo array changes
  useEffect((): void => {
    fetch("http://localhost:8000/favorites")
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error(err));
  }, [currentCount]);

  return (
    <>
      <NavBar />
      <Card>
        <CardHeader>
          <Heading size="md">
            {/* State of the database count can be mismatched with global state store on load, condition to handle this condition*/}
            Total Repositories Favorited: {currentCount || repos.length}
          </Heading>
        </CardHeader>
      </Card>
      {/* Conditional check to see if repos exists and then render the correct portion of the array if it does */}
      {repos.length > 0 &&
        repos
          .slice((page - 1) * perPage, page + perPage)
          .map((repo: IServerResponseItem) => {
            return <FavoriteRepoCard key={`${repo.id}`} result={repo} />;
          })}
      {/* Component only renders if there are favorited repos */}
      {repos.length > 0 && (
        <PaginationFavs
          setPage={setPage}
          currentPage={page}
          totalPages={Math.ceil(repos.length / perPage)}
        />
      )}
    </>
  );
};

export default FavoritesPage;
