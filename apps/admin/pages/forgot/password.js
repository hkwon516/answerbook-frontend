import React, { useEffect } from "react";
import { Typography, Button, Grid, makeStyles, Container, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../../component/generic/LinkComponent";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

export default function forgotPassword(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(props.translate("anonPages.forgetPassword.emailRequired"))
        .email(props.translate("anonPages.forgetPassword.emailValidate")),
    }),
    onSubmit: async (values, actions) => {
      try {
        await props.parse.User.requestPasswordReset(values.email);
        props.showSuccess(props.translate("anonPages.forgetPassword.messageCheckEmail"));
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    props.setTitlePageKey("anonPages.forgetPassword.title");
  }, [])

  return (
    <>

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.forgetPassword.title")}</Typography>
              <Typography variant="body1">{props.translate("anonPages.forgetPassword.subtitle")}</Typography>
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
            <Box mt={2}>
              <Button color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? props.translate("anonPages.forgetPassword.buttonSubmit") : props.translate("app.buttonWait")}{" "}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("anonPages.forgetPassword.loginPrefix")}{" "}
                <LinkComponent {...props} href="/">
                  {props.translate("anonPages.forgetPassword.linkLogin")}
                </LinkComponent>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
