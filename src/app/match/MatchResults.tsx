"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useDogDetails from "../hooks/useDogDetails";
import fetchDogMatch from "../utils/fetchDogMatch";
import LogoutButton from "../components/LogoutButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LARGE_GAP } from "../../../config";
import Image from "next/image";
import ErrorMessage from "../components/ErrorMessage";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const MatchResults = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [matchId, setMatchId] = useState("");
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [matchErrorMessage, setMatchErrorMessage] = useState("");
  const { data, error, isLoading } = useDogDetails([matchId]);
  const [dogData] = data ?? [];

  const router = useRouter();

  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      setFavoriteIds(ids.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchMatch = async () => {
      setIsMatchLoading(true);
      setMatchErrorMessage("");

      try {
        const res = await fetchDogMatch("/dogs/match", favoriteIds);
        setMatchId(res.match);
      } catch (error) {
        if (error instanceof Error) {
          setMatchErrorMessage(error.message);
        } else {
          setMatchErrorMessage("An unexpected error occurred");
        }
      } finally {
        setIsMatchLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchMatch();
    }
  }, [favoriteIds]);

  if (matchErrorMessage || error) <ErrorMessage message={matchErrorMessage} />;

  return (
    <Box
      minWidth={500}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isMatchLoading || (isLoading && <CircularProgress />)}
      {data && dogData && (
        <>
          <Typography variant="h1">You have a match!</Typography>
          {dogData.img && (
            <Image
              src={dogData.img}
              alt={`image-of-dog`}
              loading="lazy"
              width={400}
              height={400}
              style={{ borderRadius: "15%", objectFit: "cover" }}
            />
          )}
          <Box maxWidth={500} sx={{ mt: 2 }}>
            <Typography variant="body1">
              Meet {dogData.name}, a {dogData.breed} who is ready to meet their
              forever paw-parents. {dogData.name} is {dogData.age} years old and
              is located at zipcode {dogData.zip_code}.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: LARGE_GAP,
              mt: 2,
            }}
          >
            <Button onClick={() => router.push("/search")} size="large">
              Start Over
            </Button>
            <LogoutButton />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchResults;
