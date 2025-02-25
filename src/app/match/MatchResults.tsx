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
import { LARGE_GAP } from "../../../config";

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
    <>
      {data && (
        <Box minWidth={500} sx={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h1" component="h1"> You have a match! </Typography>
          <img
              src={dogData.img}
              alt={`image-of-dog`}
              loading="lazy"
              width={400}
              height={400}
              style={{borderRadius: '15%'}}
          />
          <Box maxWidth={500} sx={{ mt: 2}}>
            <Typography variant="body1" > 
              Meet {dogData.name}, a {dogData.breed} who is ready to meet their forever paw-parents. {dogData.name} is {dogData.age} years old and is located at {dogData.zip_code}
            </Typography>
          </Box>
        </Box>
      )}
      <Box sx={{display: 'flex', flexDirection: 'row', gap: LARGE_GAP, mt: 2}}>
        <Button onClick={() => router.push("/search")} size="large"> Start Over </Button>
        <LogoutButton />
      </Box>
    </>
  );
};

export default MatchResults;
