import { Flex, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { increment, decrement } from '../features/favCounter/favCounterSlice';
import { Card, CardHeader, CardBody, CardFooter, Box, Heading, Stack, Text, StackDivider, Divider } from '@chakra-ui/react'
import { useLoaderData } from "react-router-dom";
import FavoriteRepoCard from "./FavoriteRepoCard";
import { IServerResponseItem, ServerResponseProps } from "../types/types";

const FavoritesPage = () => {
    const currentRepos = useLoaderData() as IServerResponseItem[];
    const [repos, setRepos] = useState<IServerResponseItem[]>(currentRepos)
    const currentCount = useSelector((state: RootState) => state.favCounter.value);
   
   
    useEffect(() => {
        fetch('http://localhost:8000/favorites')
        .then(response => response.json())
        .then(data => setRepos(data))
        .catch(err => console.error(err))
    }, [currentCount])

    return (
        <>
            <NavBar />
            <Card>
                <CardHeader>
                    <Heading size='md'>Total Repositories Favorited: {currentCount || repos.length}</Heading>
                </CardHeader>
            </Card>
                {repos && repos.map((repo: IServerResponseItem) => {
                        return (
                            <FavoriteRepoCard
                                key={`${repo.id}`}
                                result={repo}
                            />
                        )
                })}


        </>
    )
}

export default FavoritesPage;