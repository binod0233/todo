import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import FormContainer from "./FormContainer";
import queryString from "query-string";
// const UserContainer = lazy(() => import("./UserContainer"));
import UserContainer from "./UserContainer";
const FormContainer = lazy(() => import("./FormContainer"));
const MainContainer = () => {
  const queryParams = queryString.parse(window.location.search);
  var values = { id: queryParams.id, imageId: queryParams.imageId };
  console.log("queryParams", values);
  if (values.id === undefined) {
    var callContainer = (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <FormContainer data={values} />
        </Suspense>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserContainer />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    callContainer = (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/upload" element={<FormContainer data={values} />} />
          </Routes>
        </BrowserRouter>
        <a href="/">Home</a>
      </>
    );
  }

  return <> {callContainer}</>;
};

export default MainContainer;
