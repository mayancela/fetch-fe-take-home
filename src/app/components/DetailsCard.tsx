import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SMALL_GAP } from "../../../config";
import { DogProps } from "../utils/types";

type DetailsCardProps = DogProps & {
  handleFavoriteSelect: (id: string, liked: boolean) => void;
};
const DetailsCard: React.FC<DetailsCardProps> = ({
  id,
  age,
  img,
  breed,
  name,
  zip_code,
  handleFavoriteSelect,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLiked = () => {
    setIsLiked(!isLiked);
    handleFavoriteSelect(id, !isLiked);
  };
  return (
    <Card sx={{ width: 225, margin: { SMALL_GAP } }} key={`dog-${id}`}>
      <CardMedia
        component="img"
        height="140"
        width="200"
        image={img}
        alt={`image-of-${breed}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: {breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ZIP Code: {zip_code}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLiked}>
          {!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon color="primary" />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DetailsCard;
