import React from "react";

import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../component/generic/LinkComponent";

const Login = (props) => {
  console.log(props.router.query);

  const formik = useFormik({
    initialValues: {
      email: props.router.query.email || "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(props.translate("pages.anon.login.form.validation.emailRequired"))
        .email(props.translate("pages.anon.login.form.validation.emailValidate")),
      password: yup.string().required(props.translate("pages.anon.login.form.validation.passwordRequired")),
    }),
    onSubmit: async (values, actions) => {
      try {
        await props.onLogin(values.email, values.password);
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <Box mb={2} textAlign="left">
            <Typography variant="h4">{props.translate("pages.anon.login.title")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            id="email"
            label={props.translate("pages.anon.login.form.fields.email")}
            name="email"
            autoComplete="email"
            autoFocus
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            margin="normal"
            required
            fullWidth
            name="password"
            label={props.translate("pages.anon.login.form.fields.password")}
            type="password"
            id="password"
            autoComplete="current-password"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="right" mt={2}>
            <Box>
              <LinkComponent href="forgot/password">{props.translate("pages.anon.login.links.forgotPassword")}</LinkComponent>
            </Box>
            <Box>
              <LinkComponent href="forgot/email">{props.translate("pages.anon.login.links.forgotEmail")}</LinkComponent>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
              {!formik.isSubmitting ? props.translate("pages.anon.login.form.fields.btnLogin") : props.translate("layout.buttons.wait")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              {props.translate("pages.anon.login.links.signup")}{" "}
              <LinkComponent href="/signup">{props.translate("pages.anon.signup.title")}</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
