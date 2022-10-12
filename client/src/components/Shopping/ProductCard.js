import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Pic from "../../Assets/Demo.jpg";
import AddIcon from "@mui/icons-material/Add";

const ProductCard = (props) => {
  const { item } = props;
  return (
    <Card sx={{ width: "13rem", height: "1", marginRight: "13px" }}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='a picture of something'
          image={`${Pic}`}
          src={`${Pic}`}
          sx={{ width: "100%" }}
        />
        <CardContent>
          <Rating value={item.rating} precision={0.5} size='medium' readOnly />
          <Stack
            direction='row'
            justifyContent='space-around'
            // sx={{ backgroundColor: "cadetblue" }}
          >
            <Stack justifyContent='space-between' alignItems='flex-start'>
              <Typography sx={{ textTransform: "capitalize" }}>
                {item.name}
              </Typography>
              <Typography>{`${item.price}VND/${item.metric}`}</Typography>
            </Stack>
            <Stack alignItems='center' justifyContent='center'>
              <AddIcon />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
