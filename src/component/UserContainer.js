import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserCategory, fetchImage, deleteUserCategory } from "../redux";

import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUserCategory());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchImage());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);
  const allUserCategory = useSelector((state) => state.user.userCategory);
  const allImage = useSelector((state) => state.user.imageData);
  const userData = allUserCategory.map((item) => {
    return (
      <>
        <Grid item key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            {allImage.map((item2) =>
              item.imageId === item2._id ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={"http://localhost:1337" + item2.url}
                  alt="green iguana"
                  key={item2._id}
                />
              ) : (
                <></>
              )
            )}

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.descriptions}
              </Typography>
            </CardContent>
            <CardActions>
              <a
                href={`/upload?id=${item._id}&imageId=${item.imageId}`}
                style={{ textDecoration: "none", margin: "20px" }}
              >
                Edit
              </a>
              <Button
                size="small"
                color="error"
                onClick={() =>
                  dispatch(deleteUserCategory(item.id, item.imageId))
                }
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  });

  return (
    <div>
      <Typography variant="h3" component="h4">
        All Tasks
      </Typography>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {userData}
        </Grid>
      </Box>
    </div>
  );
};

export default UserContainer;
