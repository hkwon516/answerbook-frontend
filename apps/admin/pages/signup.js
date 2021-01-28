import React from "react";
import { Typography, Radio, RadioGroup, Button, FormControlLabel, Link, Grid, Box, FormControl, FormLabel } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import Parse from "parse";
import { useRouter } from "next/router";
import LinkComponent from "../component/generic/LinkComponent";

export default function SignUp(props) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      position: "teacher",
      academyName: "",
      companyEmail: "",
      purpose: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("anonPages.signup.nameRequired")),
      email: yup
        .string()
        .required(props.translate("anonPages.signup.emailRequired"))
        .email(props.translate("anonPages.signup.emailValidate")),
      phone: yup.number(props.translate("anonPages.signup.phoneValidate")).required(props.translate("anonPages.signup.phoneRequired")),
      password: yup
        .string()
        .required(props.translate("anonPages.signup.passwordRequired"))
        .min(6, props.translate("anonPages.signup.passwordLength")),
      passwordConfirm: yup
        .string()
        .required(props.translate("anonPages.signup.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("anonPages.signup.passwordValidate")),
      academyName: yup.string().required(props.translate("anonPages.signup.academyNameRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        const user = new Parse.User();
        user.set("name", values.name);
        user.set("username", values.email);
        user.set("email", values.email);
        user.set("password", values.password);
        user.set("phone", values.phone);
        user.set("position", values.position);
        user.set("information", { academyName: values.academyName, companyEmail: values.companyEmail, purpose: values.purpose });

        await user.signUp();
        props.showSuccess(props.translate("anonPages.signup.messageSuccess"));
        router.push("/user");
      } catch (error) {
        if (error.code === 202) {
          props.showError(props.translate("anonPages.signup.messageAccountExists"));
        } else {
          props.showError(error.message);
        }
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <>
      {props.getTitle("anonPages.signup.title")}

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.signup.title")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              autoComplete="name"
              name="name"
              required
              fullWidth
              label={props.translate("anonPages.signup.fieldName")}
              size="small"
              autoFocus
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              label={props.translate("anonPages.signup.fieldEmail")}
              size="small"
              name="email"
              autoComplete="email"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              size="small"
              label={props.translate("anonPages.signup.fieldPhone")}
              name="phone"
              autoComplete="Phone Number"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              name="password"
              label={props.translate("anonPages.signup.fieldPassword")}
              type="password"
              size="small"
              autoComplete="current-password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              name="passwordConfirm"
              label={props.translate("anonPages.signup.fieldPasswordConfirmation")}
              type="password"
              size="small"
              autoComplete="current-password"
              formik={formik}
            />
          </Grid>
          {formik.values.position === "teacher" && (
            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                name="academyName"
                label={props.translate("anonPages.signup.fieldAcademyName")}
                size="small"
                autoComplete="Company Name"
                formik={formik}
              />
            </Grid>
          )}
          {formik.values.position === "publisher" && (
            <Grid item xs={12}>
              <InputComponent
                fullWidth
                name="companyEmail"
                label={props.translate("anonPages.signup.fieldCompanyEmail")}
                id="companyEmail"
                size="small"
                autoComplete="Company Email"
                formik={formik}
              />
            </Grid>
          )}

          {formik.values.position === "etc" && (
            <Grid item xs={12}>
              <InputComponent
                fullWidth
                name="purpose"
                label={props.translate("anonPages.signup.fieldPurpose")}
                size="small"
                autoComplete="purpose"
                formik={formik}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControl
              margin={(formik.touched.position && formik.errors.position ? true : false) ? "dense" : "normal"}
              error={formik.touched.position && formik.errors.position ? true : false}
            >
              <FormLabel>{props.translate("anonPages.signup.fieldPosition")}</FormLabel>

              <RadioGroup row={true} aria-label="position" name="position" value={formik.values.position} onChange={formik.handleChange}>
                <FormControlLabel value="teacher" control={<Radio />} label={props.translate("anonPages.signup.fieldTeacher")} />
                <FormControlLabel value="publisher" control={<Radio />} label={props.translate("anonPages.signup.fieldPublisher")} />
                <FormControlLabel value="etc" control={<Radio />} label={props.translate("anonPages.signup.fieldEtc")} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="secondary" fullWidth variant="contained" disabled={formik.isSubmitting}>
              {!formik.isSubmitting ? props.translate("anonPages.signup.buttonSignup") : props.translate("app.buttonWait")}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("anonPages.signup.loginPrefix")}{" "}
                <LinkComponent href="/">{props.translate("anonPages.login.title")}</LinkComponent>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
