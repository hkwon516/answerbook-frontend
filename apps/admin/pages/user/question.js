import { Box, Button, Divider, Grid, Paper, Typography, TextField, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import React from "react";
import MaterialTable from "material-table";

import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "@material-ui/core/Select";

const ManageQuestion = (props) => {
  const formik = useFormik({
    initialValues: {
      textbook: props.user.get("name"),
      id: props.user.id,
      email: props.user.get("email"),
      phone: props.user.get("phone"),
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("userPages.settings.passwordRequired")),
      email: yup
        .string()
        .required(props.translate("userPages.settings.emailRequired"))
        .email(props.translate("userPages.settings.emailValidate")),
      phone: yup
        .number(props.translate("userPages.settings.phoneValidate"))
        .required(props.translate("userPages.settings.phoneValidate"))
        .typeError(props.translate("userPages.settings.phoneValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
        props.user.set("name", values.name);
        props.user.set("email", values.email);
        props.user.set("phone", values.phone);
        const user = await props.user.save();
        props.setUser(user);
        props.showSuccess(props.translate("userPages.settings.labelSuccessMessage"));
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <>
      {props.setTitlePageKey("userPages.settings.title")}
      <form noValidate>
        <Box mt={2}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Box p={2} pt={0}>
                <Paper elevation={1}>
                  <Box p={2}>
                    <Typography>Question Statistics</Typography>
                    <Box p={2}>
                      <Grid container spacing={1} justify={"center"}>
                        <Grid item xs={12} sm={4}>
                          <FormControl
                            error={formik.touched.textbook && formik.errors.textbook}
                            variant="filled"
                            margin={"normal"}
                            fullWidth
                          >
                            <InputLabel>Textbook</InputLabel>
                            <Select value={formik.values.textbook} name="textbook" onChange={formik.handleChange}>
                              <MenuItem value={"subject"}>Textbook</MenuItem>
                            </Select>
                            {formik.touched.textbook && formik.errors.textbook && (
                              <FormHelperText error>{formik.errors.textbook}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <FormControl error={formik.touched.page && formik.errors.page} variant="filled" margin={"normal"} fullWidth>
                            <InputLabel>Page</InputLabel>
                            <Select value={formik.values.page} name="page" onChange={formik.handleChange}>
                              <MenuItem value={"subject"}>Subject</MenuItem>
                            </Select>
                            {formik.touched.page && formik.errors.page && <FormHelperText error>{formik.errors.page}</FormHelperText>}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <FormControl
                            error={formik.touched.question && formik.errors.question}
                            variant="filled"
                            margin={"normal"}
                            fullWidth
                          >
                            <InputLabel>question</InputLabel>
                            <Select value={formik.values.question} name="question" onChange={formik.handleChange}>
                              <MenuItem value={"subject"}>Question</MenuItem>
                            </Select>
                            {formik.touched.question && formik.errors.question && (
                              <FormHelperText error>{formik.errors.question}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Box mt={2}>
                          <Button type="submit" color="primary" fullWidth variant="contained" disabled={formik.isSubmitting}>
                            Search
                          </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Divider />

                  <MaterialTable
                    style={{ height: "85vh" }}
                    columns={[
                      {
                        title: "Page",
                        field: "page",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "Question number",
                        field: "questionNo",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "students",
                        field: "students",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "Graded Times",
                        field: "gradedTimes",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "Incorrectness Rate",
                        field: "incorrectnessRate",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "opt1",
                        field: "opt1",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "opt2",
                        field: "opt2",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "opt3",
                        field: "opt3",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "opt4",
                        field: "opt4",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "opt5",
                        field: "opt5",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "Short Answer",
                        field: "shortAnswer",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                      {
                        title: "Total Solutions",
                        field: "total",
                        headerStyle: {
                          backgroundColor: "#D3D3D3",
                        },
                      },
                    ]}
                    data={[
                      {
                        page: "35",
                        questionNo: "45",
                        students: "serum",
                        gradedTimes: "5",
                        incorrectnessRate: 10,
                        opt1: "opt1",
                        opt2: "opt2",
                        opt3: "opt3",
                        opt4: "opt4",
                        opt5: "opt5",
                        shortAnswer: "Short Answer",
                        total: "5",
                      },
                      {
                        page: "35",
                        questionNo: "45",
                        students: "serum",
                        gradedTimes: "5",
                        incorrectnessRate: 10,
                        opt1: "opt1",
                        opt2: "opt2",
                        opt3: "opt3",
                        opt4: "opt4",
                        opt5: "opt5",
                        shortAnswer: "Short Answer",
                        total: "5",
                      },
                    ]}
                    options={{
                      sorting: true,
                      showTitle: false,
                    }}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default ManageQuestion;
