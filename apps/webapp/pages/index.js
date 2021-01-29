import React from "react";
import Head from "next/head";
import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../component/generic/LinkComponent";
import ButtonComponent from "../component/generic/ButtonComponent";
import KakaoIcon from "../component/login/KakaoIcon";
const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: props.router.query.email || "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(props.translate("anonPages.login.emailRequired"))
        .email(props.translate("anonPages.login.emailValidate")),
      password: yup.string().required(props.translate("anonPages.login.passwordRequired")),
    }),
    onSubmit: async (values, actions) => {
      try {
        await props.onLogin(values.email, values.password);
      } catch (error) {
        if (error.code === 101 || error.code === 205) {
          props.showError(props.translate("anonPages.login.messageInvalidCredentials"));
        } else {
          props.showError(error.message);
        }
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <>
      {props.setTitlePageKey("anonPages.login.title")}
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.login.title")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              id="email"
              label={props.translate("anonPages.login.fieldEmail")}
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
              label={props.translate("anonPages.login.fieldPassword")}
              type="password"
              id="password"
              autoComplete="current-password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="right" mt={2}>
              <Box>
                <LinkComponent href="forgot/password">{props.translate("anonPages.login.linkForgotPassword")}</LinkComponent>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <ButtonComponent color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? props.translate("anonPages.login.buttonLogin") : props.translate("app.buttonWait")}
              </ButtonComponent>
            </Box>

            <Box mt={2}>
              <ButtonComponent startIcon={<KakaoIcon width={24} height={24} />} fullWidth variant="outlined">
                카카오톡으로 로그인
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("anonPages.login.linkSignupText")}{" "}
                <LinkComponent href="/signup/step1">{props.translate("anonPages.login.linkSignup")}</LinkComponent>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
