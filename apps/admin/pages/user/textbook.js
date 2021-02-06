import { Box, Button, Divider, Grid, Paper, Typography, TextField, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import React, { useEffect } from "react";
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

  useEffect(() => {
    props.setTitlePageKey("userPages.textBook.title");
  }, []);

  return (
    <>
      <form noValidate>
        <Box mt={2}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Box p={2} pt={0}>
                <Paper elevation={1}>
                  <Box p={2}>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      {props.translate("userPages.textBook.buttonRegisterTextbook")}
                    </Button>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">{props.translate("userPages.textBook.labelRegisterTextbook")}</DialogTitle>
                      <DialogContent>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControl
                              error={formik.touched.subject && formik.errors.subject}
                              variant="filled"
                              margin={"normal"}
                              fullWidth
                            >
                              <InputLabel>{props.translate("userPages.textBook.labelSubject")}</InputLabel>
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
                            <FormControl
                              error={formik.touched.category && formik.errors.category}
                              variant="filled"
                              margin={"normal"}
                              fullWidth
                            >
                              <InputLabel>{props.translate("userPages.textBook.labelCategories")}</InputLabel>
                              <Select value={formik.values.category} name="category" onChange={formik.handleChange}>
                                <MenuItem value={"category"}>Category</MenuItem>
                              </Select>
                              {formik.touched.category && formik.errors.category && (
                                <FormHelperText error>{formik.errors.category}</FormHelperText>
                              )}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <InputComponent
                              required
                              fullWidth
                              label={props.translate("userPages.textBook.labelTextbookTitle")}
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
                              label={props.translate("userPages.textBook.labelInstructor")}
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
                              label={props.translate("userPages.textBook.labelPublisher")}
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
                              label={props.translate("userPages.textBook.labelISBNNumber")}
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
                              label={props.translate("userPages.textBook.labelFrontCoverImage")}
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
                          {props.translate("userPages.textBook.buttonCancel")}
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          {props.translate("userPages.textBook.buttonSubmit")}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                  <Divider />

                  <MaterialTable
                    style={{ height: "85vh" }}
                    columns={[
                      { title: props.translate("userPages.textBook.labelTextbookTitle"), field: "title" },
                      { title: props.translate("userPages.textBook.labelSubject"), field: "subject" },
                      { title: props.translate("userPages.textBook.labelPublisher"), field: "publisher" },
                      {
                        title: props.translate("userPages.textBook.labelInstructor"),
                        field: "instructor",
                      },
                      { title: props.translate("userPages.textBook.labelRegisteredQuestion"), field: "registerQuestion" },
                      { title: props.translate("userPages.textBook.labelPutInAnswers"), field: "putInAnswer" },
                      { title: props.translate("userPages.textBook.labelOpenPublic"), field: "openPublic" },
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
