import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Typography,
  colors,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import React from "react";
import withApp from "../../utils/withApp";
import { useFormik } from "formik";
import * as yup from "yup";
import Parse from "parse";
import InputComponent from "../../component/generic/InputComponent";

const Settings = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({
      passwordConfirm: yup
        .string()
        .required(props.translate("passwordConfirmationRequired"))
        .oneOf([yup.ref("newPassword")], props.translate("passwordValidate")),
    }),

    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        props.showError(error.message);
      }
    },
  });

  return (
    <Grid container justify={"center"}>
      <Grid item xs={12} md={4}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container justify={"center"}>
            <Grid item xs={12}>
              <Box mb={2} textAlign="left">
                <Typography variant="h5">My account</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <InputComponent
                autoComplete="name"
                name="name"
                required
                fullWidth
                label={props.translate("name")}
                size="small"
                autoFocus
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent required fullWidth label="Id" size="small" name="id" autoComplete="id" formik={formik} />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                label={props.translate("emailAddress")}
                size="small"
                name="email"
                autoComplete="email"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                size="small"
                label={props.translate("phoneNumber")}
                name="phoneNumber"
                autoComplete="Phone Number"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="currentPassword"
                label="Current password"
                type="password"
                size="small"
                autoComplete="current-password"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                size="small"
                autoComplete="Company Name"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="passwordConfirm"
                label={props.translate("passwordConfirmation")}
                type="password"
                size="small"
                autoComplete="current-password"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="secondary" fullWidth variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Settings;
