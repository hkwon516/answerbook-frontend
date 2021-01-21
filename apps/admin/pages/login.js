import React from "react";

import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../component/generic/LinkComponent";

export default function Login(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required(props.translate("emailRequired")).email(props.translate("emailValidate")),
      password: yup.string().required(props.translate("passwordRequired")),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <Box mb={2} textAlign="left">
            <Typography variant="h4">{props.translate("login")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            id="email"
            label={props.translate("emailAddress")}
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
            label={props.translate("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="right" mt={2}>
            <Box>
              <LinkComponent href="forgot/password">{props.translate("forgotPassword")}</LinkComponent>
            </Box>
            <Box>
              <LinkComponent href="forgot/email">{props.translate("forgotEmail")}</LinkComponent>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <Button color="secondary" type="submit" fullWidth variant="contained">
              {props.translate("btnLogin")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              {props.translate("dontHaveAccount")} <LinkComponent href="/signup">{props.translate("signup")}</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
