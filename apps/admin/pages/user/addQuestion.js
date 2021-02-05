import { Box, Button, Divider, Grid, Paper, Typography, makeStyles, InputAdornment, TextField, colors } from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  gridItem: {
    border: 1,
  },
});

const addQuestion = (props) => {
  const classes = useStyles();

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                    <Typography>Answers</Typography>
                    <Box p={2}>
                      <Grid container spacing={1} justify={"center"}>
                        <Grid item xs={12} sm={4}>
                          <InputComponent
                            autoComplete="subject"
                            name="subject"
                            fullWidth
                            label="Subject"
                            size="small"
                            autoFocus
                            formik={formik}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputComponent
                            autoComplete="range"
                            name="range"
                            fullWidth
                            label="Range"
                            size="small"
                            autoFocus
                            formik={formik}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputComponent
                            autoComplete="textbook"
                            name="textbook"
                            fullWidth
                            label="Textbook"
                            size="small"
                            autoFocus
                            formik={formik}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputComponent
                            autoComplete="intructor"
                            name="instructor"
                            fullWidth
                            label="Instructor"
                            size="small"
                            autoFocus
                            formik={formik}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputComponent
                            autoComplete="Publisher"
                            name="publisher"
                            fullWidth
                            label="Publisher"
                            size="small"
                            autoFocus
                            formik={formik}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputComponent autoComplete="ISBN" name="ISBN" fullWidth label="ISBN" size="small" autoFocus formik={formik} />
                        </Grid>

                        <Grid item xs={12}>
                          <AppBar position="static" color="default">
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              indicatorColor="primary"
                              textColor="primary"
                              variant="scrollable"
                              scrollButtons="auto"
                              aria-label="scrollable auto tabs example"
                            >
                              <Tab label="Item One" {...a11yProps(0)} />
                              <Tab label="Item Two" {...a11yProps(1)} />
                              <Tab label="Item Three" {...a11yProps(2)} />
                              <Tab label="Item Four" {...a11yProps(3)} />
                              <Tab label="Item Five" {...a11yProps(4)} />
                              <Tab label="Item Six" {...a11yProps(5)} />
                              <Tab label="Item Seven" {...a11yProps(6)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                              <Grid container justify={"center"}>
                                <Grid item xs={12} sm={4} >
                                  <Box
                                    style={{
                                        backgroundColor: "transparent",
                                        border: `1px solid ${colors.grey[400]}`,
                                        width: 180,
                                        height: 30,
                                        margin: "0 auto",
                                      }}
                                  >
                                    <Typography>Question Number</Typography>
                                  </Box>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                <Box
                                    style={{
                                        backgroundColor: "transparent",
                                        border: `1px solid ${colors.grey[400]}`,
                                        width: 180,
                                        height: 30,
                                        margin: "0 auto",
                                      }}
                                  >
                                  <Typography>Answer</Typography>
                                  </Box>
                                </Grid>

                                <Grid item xs={12} sm={4} alignItems={"center"}>
                                <Box
                                    style={{
                                        backgroundColor: "transparent",
                                        border: `1px solid ${colors.grey[400]}`,
                                        width: 180,
                                        height: 30,
                                        margin: "0 auto",
                                      }}
                                  >
                                  <Typography>Author's Note</Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </TabPanel>
                          </AppBar>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Divider />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default addQuestion;
