import React from "react";
import Head from "next/head";
import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import ButtonComponent from "../../component/generic/ButtonComponent";

const ResetPassword = (props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required(props.translate("anonPages.reset.passwordRequired"))
        .min(6, props.translate("anonPages.reset.passwordLength")),
      confirmPassword: yup
        .string()
        .required(props.translate("anonPages.reset.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("anonPages.reset.passwordValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            new_password: values.password,
            confirm_new_password: values.confirmPassword,
            "utf-8": true,
            username: props.router.query.username,
            token: props.router.query.token,
          }),
        };
        await fetch("http://localhost:9000/parse/apps/answerbookApi/request_password_reset", params).then(
          (Response) => {
            if (Response.status === 200) {
              props.showSuccess("Reset password successfully.");
              router.push("/");
            }
          },
          (error) => {
            props.showError(error.message);
          }
        );

        console.log("value:-", values.password);
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <>
      {props.setTitlePageKey("anonPages.reset.title")}
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.reset.title")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              margin="normal"
              required
              fullWidth
              name="password"
              label={props.translate("anonPages.reset.fieldPassword")}
              type="password"
              autoComplete="password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={props.translate("anonPages.reset.fieldConfirmPassword")}
              type="password"
              autoComplete="confirm-password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <ButtonComponent color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? props.translate("anonPages.reset.buttonReset") : props.translate("app.buttonWait")}
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ResetPassword;
