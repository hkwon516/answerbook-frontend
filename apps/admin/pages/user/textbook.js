import { Box, Button, Divider, Grid, Paper, Typography, TextField, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import React from "react";
import MaterialTable from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "@material-ui/core/Select";

const ManageTextbook = (props) => {
  const formik = useFormik({
    initialValues: {
      subject: props.user.get("Korean"),
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Register Textbook
                    </Button>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Register Textbook</DialogTitle>
                      <DialogContent>
                        <Grid container>
                          <Grid item xs={12}>
                              <FormControl
                                error={formik.touched.subject && formik.errors.subject}
                                variant="filled"
                                margin={"normal"}
                                fullWidth
                              >
                                <InputLabel>Subject</InputLabel>
                                <Select value={formik.values.subject} name="school" onChange={formik.handleChange}>
                                  <MenuItem value={"Korean"}>Korean</MenuItem>
                                  <MenuItem value={"Math"}>Math</MenuItem>
                                  <MenuItem value={"English"}>English</MenuItem>
                                  <MenuItem value={"Social studies"}>Social studies</MenuItem>
                                  <MenuItem value={"Science"}>Science</MenuItem>
                                </Select>
                                {formik.touched.subject && formik.errors.subject && (
                                  <FormHelperText error>{formik.errors.subject}</FormHelperText>
                                )}
                              </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            {/* <Box mr={1}> */}
                              <FormControl
                                error={formik.touched.category && formik.errors.category}
                                variant="filled"
                                margin={"normal"}
                                fullWidth
                              >
                                <InputLabel>Categories</InputLabel>
                                <Select value={formik.values.category} name="category" onChange={formik.handleChange}>
                                  <MenuItem value={"category"}>Category</MenuItem>
                                </Select>
                                {formik.touched.category && formik.errors.category && (
                                  <FormHelperText error>{formik.errors.category}</FormHelperText>
                                )}
                              </FormControl>
                            {/* </Box> */}
                          </Grid>

                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              label="Textbook Title"
                              size="small"
                              name="textbookTitle"
                              autoComplete="Textbook Title"
                              formik={formik}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              label="Instructor"
                              size="small"
                              name="instructor"
                              autoComplete="instructor"
                              formik={formik}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              size="small"
                              label="Publisher"
                              name="publisher"
                              autoComplete="Publisher"
                              formik={formik}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              size="small"
                              label="ISBN Number"
                              name="isbnNumber"
                              autoComplete="Publisher"
                              formik={formik}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              size="small"
                              label="Front Cover Image"
                              name="frontCoverImage"
                              autoComplete="Front Cover Image"
                              formik={formik}
                            />
                          </Grid>
                          {/* </Box>
                          </Grid> */}
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                  <Divider />

                  <MaterialTable
                    style={{ height: "85vh" }}
                    columns={[
                      { title: "Textbook title", field: "title" },
                      { title: "Subject", field: "subject" },
                      { title: "Publisher", field: "publisher" },
                      {
                        title: "Instructor",
                        field: "instructor",
                      },
                      { title: "Registered Questions", field: "registerQuestion" },
                      { title: "Put in answers", field: "putInAnswer" },
                      { title: "Open Public", field: "openPublic" },
                    ]}
                    data={[
                      {
                        title: "Ssen",
                        subject: "Math",
                        publisher: "serum",
                        instructor: "kim",
                        registerQuestion: 10,
                        putInAnswer: "p49(in progress)",
                      },
                      {
                        title: "usen",
                        subject: "path",
                        publisher: "terum",
                        instructor: "lim",
                        registerQuestion: 11,
                        putInAnswer: "p50(in progress)",
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

export default ManageTextbook;
