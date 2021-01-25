import { AppBar, Box, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import MenuIcon from "@material-ui/icons/Menu";

const GeneralComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object().shape({
      password: yup.string().min(6).required(props.translate("passwordRequired")),
      passwordConfirm: yup
        .string()
        .required(props.translate("passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("passwordValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
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
            Security
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container>
            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="password"
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
              <Button type="submit" color="secondary" size="small" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? "Confirm" : props.translate("layout.buttons.wait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default GeneralComponent;
