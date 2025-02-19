"use client";

import Container from "@mui/material/Container";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useDogDetails from "../hooks/useDogDetails";
import fetchDogMatch from "../utils/fetchDogMatch";
import LogoutButton from "../components/LogoutButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const MatchResults = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [matchId, setMatchId] = useState("");
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [isMatchError, setMatchError] = useState("");
  const { data, error, isLoading } = useDogDetails([matchId]);
  const [dogData] = data ?? [];

  const router = useRouter();

  console.log("match data", data);
  console.log("favoriteIds", favoriteIds);

  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      setFavoriteIds(ids.split(","));
    }
  }, [searchParams]);

  // Fetch match when favoriteIds changes
  useEffect(() => {
    const fetchMatch = async () => {
      setIsMatchLoading(true);
      setMatchError("");

      try {
        const res = await fetchDogMatch("/dogs/match", favoriteIds);
        setMatchId(res.match);
      } catch (error) {
        setMatchError("An error occurred");
      } finally {
        setIsMatchLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchMatch();
    }
  }, [favoriteIds]);

  return (
    <Container>
      {data && (
        <Box>
          <Typography> {dogData.name} </Typography>
          <Typography> {dogData.breed} </Typography>
          <Typography> {dogData.zip_code} </Typography>
          <Typography> {dogData.age} </Typography>
        </Box>
      )}
      <Button onClick={() => router.push("/search")}> Start Over</Button>
      <LogoutButton />
    </Container>
  );
};

export default MatchResults;
