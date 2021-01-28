import React from "react";
import { Typography, Button, Grid, makeStyles, Container, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import parse from "../../utils/parse";
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
    onSubmit: async (values) => {
      try {
        await parse.User.requestPasswordReset(values.email);
        alert(JSON.stringify(values, null, 2));
      } catch (error) {
        props.showError(error.message);
      }
    },
  });

  return (
    <>
      {props.getTitle("anonPages.forgetPassword.title")}

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
              <Button color="secondary" type="submit" fullWidth variant="contained">
                {props.translate("anonPages.forgetPassword.btnSubmit")}{" "}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("anonPages.forgetPassword.linkRememberPassword")}{" "}
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
