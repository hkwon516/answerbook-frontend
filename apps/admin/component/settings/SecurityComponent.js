import { AppBar, Box, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import MenuIcon from "@material-ui/icons/Menu";

const GeneralComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({
      currentPassword: yup
        .string()
        .required(props.translate("pages.user.settings.forms.validation.passwordRequired"))
        .min(6, props.translate("pages.user.settings.forms.validation.passwordLength")),
      password: yup
        .string()
        .required(props.translate("pages.user.settings.forms.validation.passwordRequired"))
        .min(6, props.translate("pages.user.settings.forms.validation.passwordLength")),
      passwordConfirm: yup
        .string()
        .required(props.translate("pages.user.settings.forms.validation.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("pages.user.settings.forms.validation.passwordValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
        await props.user.verifyPassword(values.currentPassword);
        props.user.set("password", values.password);
        await props.user.save();
        props.showSuccess("Password updated successfully");
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
            {props.translate("pages.user.settings.forms.labels.security")}
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
                label={props.translate("pages.user.settings.forms.fields.currentPassword")}
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
                label={props.translate("pages.user.settings.forms.fields.newPassword")}
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
                label={props.translate("pages.user.settings.forms.fields.confirmPassword")}
                type="password"
                size="small"
                autoComplete="confirm-password"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" size="small" disabled={formik.isSubmitting}>
                {!formik.isSubmitting
                  ? props.translate("pages.user.settings.forms.buttons.confirm")
                  : props.translate("layout.buttons.wait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default GeneralComponent;
