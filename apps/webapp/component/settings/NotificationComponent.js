import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
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
import { FormatListBulleted } from "@material-ui/icons";

const NotificationComponent = (props) => {
  const preferences = props.user.get("preferences");
  const initialValues =  {
    solutionLike: preferences?.get("solutionLike") || false,
    solutionSave: preferences?.get("solutionSave") || false,
    solutionAlert: preferences?.get("solutionAlert") || false,
    commentAlert: preferences?.get("commentAlert") || false
  };
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({}),
    onSubmit: async (values, actions) => {
      try {
        if (!preferences) {
          throw new Error("User was signed up without preferences.");
        }
        let persist = false;
        Object.keys(values).forEach( (key)=>{
          const newValue = values[key];
          if (newValue != preferences.get(key)) {
            props.user.get("preferences").set(key, newValue);
            persist = true;
          }
        })
        if (persist) {
          await props.user.save();
          props.showSuccess(props.translate("userPages.settings.labelSuccessMessage"));
        }
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  useEffect(()=>{
    formik.handleSubmit();
  }, [formik.values])
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Box mt={1}>
        <List subheader={<ListSubheader disableGutters>{props.translate("userPages.settings.lableListSubheader")}</ListSubheader>}>
          <ListItem disableGutters>
            <ListItemText
              style={{ paddingRight: 10 }}
              primary={props.translate("userPages.settings.lableSwitchOnePrimary")}
              secondary={props.translate("userPages.settings.lableSwitchOneSecondary")}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                name="solutionLike"
                onChange={formik.handleChange}
                checked={formik.values.solutionLike}
                inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem disableGutters>
            <ListItemText
              style={{ paddingRight: 10 }}
              primary={props.translate("userPages.settings.lableSwitchTwoPrimary")}
              secondary={props.translate("userPages.settings.lableSwitchTwoSecondary")}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                name="solutionSave"
                onChange={formik.handleChange}
                checked={formik.values.solutionSave}
                inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem disableGutters>
            <ListItemText
              style={{ paddingRight: 10 }}
              primary={props.translate("userPages.settings.lableSwitchThreePrimary")}
              secondary={props.translate("userPages.settings.lableSwitchThreeSecondary")}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                name="commentAlert"
                onChange={formik.handleChange}
                checked={formik.values.commentAlert}
                inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem disableGutters>
            <ListItemText
              style={{ paddingRight: 10 }}
              primary={props.translate("userPages.settings.lableSwitchFourPrimary")}
              secondary={props.translate("userPages.settings.lableSwitchFourSecondary")}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                name="solutionAlert"
                onChange={formik.handleChange}
                checked={formik.values.solutionAlert}
                inputProps={{ "aria-labelledby": "switch-list-label-likes" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    </form>
  );
};

export default NotificationComponent;
