import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";
const api = process.env.REACT_APP_URL;

export default function GetImage(props) {
  const allImage = useSelector((state) => state.user.imageData);
  if (props.id !== undefined) {
    var values = props.id;
  }
  return (
    <div>
      {" "}
      {allImage.map((item2) =>
        values === item2._id ? (
          <CardMedia
            component="img"
            height="140"
            image={`${api}` + item2.url}
            alt="img"
            key={item2._id}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
}
