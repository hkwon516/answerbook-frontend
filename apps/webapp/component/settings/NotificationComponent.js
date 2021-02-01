import { Box, Divider, Grid, Paper, Typography, Select, InputAdornment, MenuItem } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../generic/InputComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";

const NotificationComponent = (props) => {
  const [checked, setChecked] = React.useState(["likes"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const formik = useFormik({
    initialValues: {
      school: "",
      grade: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({}),

    onSubmit: async (values, actions) => {
      try {
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });
  return (
            <form noValidate onSubmit={formik.handleSubmit}>
              <Paper elevation={1}>
                <Box p={2} pt={1} pb={1}>
                  <Typography style={{ opacity: 0.5 }} variant="body2">
                  {props.translate("userPages.settings.labelNotification")}
                  </Typography>
                </Box>
                <Divider />
                <Box p={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <InputComponent
                        required
                        fullWidth
                        label={props.translate("userPages.settings.fieldSchool")}
                        size="small"
                        name="school"
                        autoComplete="school"
                        formik={formik}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Select disableUnderline value={formik.values.school} name="emailProvider" onChange={formik.handleChange}>
                                <MenuItem dense value={"school"}>
                                  school
                                </MenuItem>
                              </Select>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputComponent
                        required
                        fullWidth
                        label={props.translate("userPages.settings.fieldGrade")}
                        size="small"
                        name="grade"
                        autoComplete="grade"
                        formik={formik}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Select disableUnderline value={formik.values.grade} name="grade" onChange={formik.handleChange}>
                                <MenuItem dense value={"grade"}>
                                  grade
                                </MenuItem>
                              </Select>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputComponent required fullWidth name="searchSchool" label={props.translate("userPages.settings.fieldSchool")} size="small" autoComplete="school" formik={formik} />
                    </Grid>

                    <Grid item xs={12}>
                      <List subheader={<ListSubheader>{props.translate("userPages.settings.lableListSubheader")}</ListSubheader>}>
                        <ListItem>
                          <ListItemText primary={props.translate("userPages.settings.lableSwitchOnePrimary")} secondary={props.translate("userPages.settings.lableSwitchOneSecondary")} />
                          <ListItemSecondaryAction>
                            <Switch
                              edge="end"
                              onChange={handleToggle("likes")}
                              checked={checked.indexOf("likes") !== -1}
                              inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem>
                          <ListItemText primary={props.translate("userPages.settings.lableSwitchTwoPrimary")} secondary={props.translate("userPages.settings.lableSwitchTwoSecondary")} />
                          <ListItemSecondaryAction>
                            <Switch
                              edge="end"
                              onChange={handleToggle("saveSolution")}
                              checked={checked.indexOf("saveSolution") !== -1}
                              inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem>
                          <ListItemText primary={props.translate("userPages.settings.lableSwitchThreePrimary")} secondary={props.translate("userPages.settings.lableSwitchThreeSecondary")} />
                          <ListItemSecondaryAction>
                            <Switch
                              edge="end"
                              onChange={handleToggle("comments")}
                              checked={checked.indexOf("comments") !== -1}
                              inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem>
                          <ListItemText
                            primary={props.translate("userPages.settings.lableSwitchFourPrimary")} secondary={props.translate("userPages.settings.lableSwitchFourSecondary")}
                          />
                          <ListItemSecondaryAction>
                            <Switch
                              edge="end"
                              onChange={handleToggle("alert")}
                              checked={checked.indexOf("alert") !== -1}
                              inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </form>
  );
};

export default NotificationComponent;
