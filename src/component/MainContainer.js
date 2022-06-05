import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormContainer from "./FormContainer";
import queryString from "query-string";
const UserContainer = lazy(() => import("./UserContainer"));
const MainContainer = () => {
  const queryParams = queryString.parse(window.location.search);
  var values = { id: queryParams.id, imageId: queryParams.imageId };
  if (values.id === undefined) {
    var callContainer = (
      <div>
        <FormContainer data={values} />

        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<UserContainer />} />
            </Routes>
          </Suspense>
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
        <br />
        <br />

        <a href="/">Home</a>
      </>
    );
  }

  return <> {callContainer}</>;
};

export default MainContainer;
