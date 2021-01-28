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
        .required(props.translate("pages.anon.forgetPassword.form.validation.emailRequired"))
        .email(props.translate("pages.anon.forgetPassword.form.validation.emailValidate")),
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
              <Typography variant="h4">{props.translate("pages.anon.forgetPassword.title")}</Typography>
              <Typography variant="body1">{props.translate("pages.anon.forgetPassword.subtitle")}</Typography>
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
            <Box mt={2}>
              <Button color="secondary" type="submit" fullWidth variant="contained">
                {props.translate("pages.anon.forgetPassword.form.fields.btnSubmit")}{" "}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("pages.anon.forgetPassword.links.loginLabel")}{" "}
                <LinkComponent {...props} href="/">
                  {props.translate("pages.anon.forgetPassword.links.loginLink")}
                </LinkComponent>
              </Typography>
            </Box>
          </Grid>
      </Grid>
    </form>
  );
}
