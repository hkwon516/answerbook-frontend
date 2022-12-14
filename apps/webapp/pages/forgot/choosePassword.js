import React, { useEffect } from "react";
import Head from "next/head";
import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import ButtonComponent from "../../component/generic/ButtonComponent";
import getParse from "../../utils/parse";
import config from "../../config/";

const ChoosePassword = (props) => {
  console.log("props", props);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required(props.translate("anonPages.forgotChoosePassword.passwordRequired"))
        .min(6, props.translate("anonPages.forgotChoosePassword.passwordLength")),
      confirmPassword: yup
        .string()
        .required(props.translate("anonPages.forgotChoosePassword.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("anonPages.forgotChoosePassword.passwordValidate")),
    }),

    onSubmit: async (values, actions) => {
      try {
        let body = {
          new_password: values.password,
          confirm_new_password: values.confirmPassword,
          "utf-8": "✓",
          username: props.router.query.username,
          token: props.router.query.token,
        };
        var formBody = [];
        for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        };

        await fetch("http://localhost:9000/parse/apps/answerbookApi/request_password_reset", params);
        props.showSuccess(props.translate("anonPages.forgotChoosePassword.messageSuccess"));
        if (props.isAdmin) {
          window.location.href = config.adminURL;
        } else {
          props.router.push("/");
        }
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    props.setTitlePageKey("anonPages.forgotChoosePassword.title");
  }, []);

  return (
    <Box p={2} mt={6.5}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.forgotChoosePassword.title")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              margin="normal"
              required
              fullWidth
              name="password"
              label={props.translate("anonPages.forgotChoosePassword.fieldPassword")}
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
              label={props.translate("anonPages.forgotChoosePassword.fieldConfirmPassword")}
              type="password"
              autoComplete="confirm-password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <ButtonComponent color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? props.translate("anonPages.forgotChoosePassword.buttonReset") : props.translate("app.buttonWait")}
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

ChoosePassword.getInitialProps = async ({ query }) => {
  const Parse = getParse();
  const isAdmin = await Parse.Cloud.run("isAdmin", { username: query.username });

  return { isAdmin };
};

export default ChoosePassword;
