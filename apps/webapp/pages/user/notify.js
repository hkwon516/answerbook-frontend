import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Select,
  InputAdornment,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";

const notify = (props) => {
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
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({

    }),

    onSubmit: async (values, actions) => {
      try {
       
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });
  return (
      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={4} sm={6}>
            <Box mt={2}>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Paper elevation={1}>
                  <Box p={2} pt={1} pb={1}>
                    <Typography style={{ opacity: 0.5 }} variant="body2">
                      Settings
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          required
                          fullWidth
                          label="School"
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
                          label="Grade"
                          size="small"
                          name="grade"
                          autoComplete="grade"
                          formik={formik}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Select disableUnderline value={formik.values.grade} name="emailProvider" onChange={formik.handleChange}>
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
                        <InputComponent
                          required
                          fullWidth
                          name="school"
                          label="School"
                          size="small"
                          autoComplete="school"
                          formik={formik}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <List subheader={<ListSubheader>Push Alarm Settings</ListSubheader>}>

                          <ListItem>
                            <ListItemText primary="Likes on my solution" secondary="Alert when others like my solution." />
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
                            <ListItemText primary="Save my solution" secondary="Alert when others save my solution." />
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
                            <ListItemText primary="Comments" secondary="Alert when someone comments on my comment." />
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
                            <ListItemText primary="Alert Solution" secondary="Alert when new solutions are uploaded in questions I set Alarm for ." />
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
            </Box>
          </Grid>
        </Grid>
      </Box>

  );
};

export default notify;
