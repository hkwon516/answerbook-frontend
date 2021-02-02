import { Box, Divider, Paper, Typography } from "@material-ui/core";
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
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    initialValues: {},
    validationSchema: yup.object().shape({}),

    onSubmit: async (values, actions) => {
      try {
        const schoolQuery = new props.parse.Query(props.parse.Object.extend("school"));
        const school = await schoolQuery.get(values.school.objectId);
        const gradeQuery = new props.parse.Query(props.parse.Object.extend("grade"));
        const grade = await gradeQuery.get(values.grade);
        const Student = props.parse.Object.extend("Student");
        const newStudent = new Student();

        newStudent.set("school", school);
        newStudent.set("grade", grade);
      } catch (error) {
        if (error.code === 202) {
          props.showError(props.translate("anonPages.signupStep2.messageAccountExists"));
        } else {
          props.showError(error.message);
        }
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
          <Box mt={1}>
            <List subheader={<ListSubheader disableGutters>{props.translate("userPages.settings.lableListSubheader")}</ListSubheader>}>
              <ListItem disableGutters>
                <ListItemText
                  primary={props.translate("userPages.settings.lableSwitchOnePrimary")}
                  secondary={props.translate("userPages.settings.lableSwitchOneSecondary")}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle("likes")}
                    checked={checked.indexOf("likes") !== -1}
                    inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={props.translate("userPages.settings.lableSwitchTwoPrimary")}
                  secondary={props.translate("userPages.settings.lableSwitchTwoSecondary")}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle("saveSolution")}
                    checked={checked.indexOf("saveSolution") !== -1}
                    inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={props.translate("userPages.settings.lableSwitchThreePrimary")}
                  secondary={props.translate("userPages.settings.lableSwitchThreeSecondary")}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle("comments")}
                    checked={checked.indexOf("comments") !== -1}
                    inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={props.translate("userPages.settings.lableSwitchFourPrimary")}
                  secondary={props.translate("userPages.settings.lableSwitchFourSecondary")}
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
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default NotificationComponent;
