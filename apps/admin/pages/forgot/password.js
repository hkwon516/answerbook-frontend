import React from "react";
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
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .required(props.translate("anonPages.forgetPassword.emailRequired"))
        .email(props.translate("anonPages.forgetPassword.emailValidate")),
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
  );
}
