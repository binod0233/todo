import {
  ADD_USERCATEGORY,
  FETCH_USERCATEGORY,
  DELETE_USERCATEGORY,
  UPDATE_USERCATEGORY,
  FETCH_IMAGE,
} from "./userType";
const axios = require("axios");
const api = process.env.REACT_APP_URL;

export const addUserCategory = (title, descriptions, formData) => {
  if (formData === "empty") {
    var OPTION = {
      url: `${api}/tests/`,
      method: "POST",
      data: { title, descriptions },
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    return {
      type: ADD_USERCATEGORY,
    };
  } else {
    axios.post(`${api}/upload/`, formData).then((res) => {
      const imageId = res.data[0].id;
      console.log(res);
      var OPTION = {
        url: `${api}/tests/`,

        method: "POST",
        data: { title, descriptions, imageId },
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(OPTION)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
      return {
        type: ADD_USERCATEGORY,
      };
    });
  }
};

export const fetchUserCategory = () => {
  return function (dispatch) {
    var OPTION = {
      url: `${api}/tests/`,

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(OPTION)
      .then((res) => {
        const userCategory = res.data;
        dispatch(getUserCategory(userCategory));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};

export const getUserCategory = (userCategory) => {
  return {
    type: FETCH_USERCATEGORY,
    payload: userCategory,
  };
};

export const fetchImage = () => {
  return function (dispatch) {
    var OPTION = {
      url: `${api}/upload/files/`,

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(OPTION)
      .then((res) => {
        const imageData = res.data;
        dispatch(getImage(imageData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getImage = (imageData) => {
  return {
    type: FETCH_IMAGE,
    payload: imageData,
  };
};

export const deleteUserCategory = (id, imageId) => {
  var OPTION = {
    url: `${api}/tests/` + id,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(OPTION)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(id);
  var OPTION2 = {
    url: `${api}/upload/files/` + imageId,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(OPTION2)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    type: DELETE_USERCATEGORY,
    payload: id,
  };
};

export const updateUserCategory = (
  id,
  title,
  descriptions,
  imageId,
  formData
) => {
  if (formData === "empty") {
    var OPTION = {
      url: `${api}/tests/` + id,

      method: "PUT",
      data: { title, descriptions, imageId },
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(OPTION)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios.post(`${api}/upload/`, formData).then((res) => {
      const iId = res.data[0].id;
      console.log(res);
      var OPTION = {
        url: `${api}/tests/` + id,

        method: "PUT",
        data: { title, descriptions, imageId: iId },
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(OPTION)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    var OPTION2 = {
      url: `${api}/upload/files/` + imageId,
      method: "DELETE",
      data: { id },
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(OPTION2)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    type: UPDATE_USERCATEGORY,
    payload: id,
  };
};
