import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addUserCategory, updateUserCategory } from "../redux";
import * as Yup from "yup";
import { Button, Typography, Grid, Paper } from "@mui/material";

const ToDoSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(50, "Text is too long"),
});

const FormContainer = (props) => {
  const { id, imageId } = props.data;
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Paper elevation={2}>
        <Typography variant="h3" component="h4">
          ToDo List
        </Typography>
        <Formik
          initialValues={{
            title: "",
            description: "",
            imageId: "",
          }}
          validationSchema={ToDoSchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            resetForm({ values: "" });

            if (files === undefined) {
              if (id !== undefined) {
                dispatch(
                  updateUserCategory(
                    id,
                    values.title,
                    values.description,
                    imageId,
                    "empty"
                  )
                );
                window.location.assign("/");
              } else {
                dispatch(
                  addUserCategory(values.title, values.description, "empty")
                );
              }
              setSubmitting(false);
            } else {
              const formData = new FormData();
              formData.append("files", files[0]);

              if (id !== undefined) {
                dispatch(
                  updateUserCategory(
                    id,
                    values.title,
                    values.description,
                    imageId,
                    formData
                  )
                );
              } else {
                dispatch(
                  addUserCategory(values.title, values.description, formData)
                );
              }
              setSubmitting(false);
            }
          }}
          render={({ isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <br />
                  <label htmlFor="name"> Title:</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Abc"
                    style={{
                      width: "20%",
                      boxSizing: "boarderBox",
                      padding: "10px 16px",
                      margin: "5px 0px",
                    }}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="field-error"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="name" style={{ padding: "10px" }}>
                    {" "}
                    Description:
                  </label>

                  <Field
                    name="description"
                    type="text"
                    as="textarea"
                    style={{
                      width: "25%",
                      boxSizing: "boarderBox",
                      padding: "10px 16px",
                      margin: "5px 0px",
                    }}
                  />
                  <ErrorMessage name="description" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="image">Image:</label>
                  <input
                    name="image"
                    placeholder="binod0233"
                    type="file"
                    style={{
                      width: "23%",
                      boxSizing: "boarderBox",
                      padding: "10px 16px",
                      margin: "5px 0px",
                    }}
                    onChange={(e) => {
                      setFiles(e.target.files);
                    }}
                  />
                  <ErrorMessage name="imageId" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {id !== undefined ? "Edit" : "Add"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </Paper>
    </div>
  );
};
export default FormContainer;
