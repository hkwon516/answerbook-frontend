import { AppBar, Box, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import MenuIcon from "@material-ui/icons/Menu";

const SecurityComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({
      currentPassword: yup
        .string()
        .required(props.translate("userPages.settings.passwordRequired"))
        .min(6, props.translate("userPages.settings.passwordLength")),
      password: yup
        .string()
        .required(props.translate("userPages.settings.passwordRequired"))
        .min(6, props.translate("userPages.settings.passwordLength")),
      passwordConfirm: yup
        .string()
        .required(props.translate("userPages.settings.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("userPages.settings.passwordValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
        await props.user.verifyPassword(values.currentPassword);
        props.user.set("password", values.password);
        await props.user.save();
        props.showSuccess(props.translate("userPages.settings.labelPasswordUpdateMessage"));
        actions.resetForm();
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
            {props.translate("userPages.settings.labelSecurity")}
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container>
            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="currentPassword"
                label={props.translate("userPages.settings.fieldCurrentPassword")}
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
                name="password"
                label={props.translate("userPages.settings.fieldNewPassword")}
                type="password"
                size="small"
                autoComplete="password"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="passwordConfirm"
                label={props.translate("userPages.settings.fieldConfirmPassword")}
                type="password"
                size="small"
                autoComplete="confirm-password"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" size="small" disabled={formik.isSubmitting}>
                {!formik.isSubmitting
                  ? props.translate("userPages.settings.buttonConfirm")
                  : props.translate("app.buttonWait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default SecurityComponent;
