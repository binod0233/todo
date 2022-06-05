import React, { Suspense, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategory, fetchImage, deleteUserCategory } from "../redux";

import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const GetImage = lazy(() => import("./GetImage"));

const UserContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUserCategory());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchImage());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  const allUserCategory = useSelector((state) => state.user.userCategory);
  const userData = allUserCategory.map((item) => {
    return (
      <>
        <Grid item key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            {
              <Suspense fallback={<div>Loading...</div>}>
                <GetImage id={item.imageId} />
              </Suspense>
            }

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
