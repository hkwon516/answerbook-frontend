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
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      position: "teacher",
      academyName: "",
      companyEmail: "",
      purpose: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("nameRequired")),
      email: yup.string().required(props.translate("emailRequired")).email(props.translate("emailValidate")),
      phoneNumber: yup.number(props.translate("phoneNumberValidate")).required(props.translate("phoneNumberRequired")),
      password: yup.string().required(props.translate("passwordRequired")),
      passwordConfirm: yup
        .string()
        .required(props.translate("passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("passwordValidate")),
    }),

    onSubmit: async (values) => {
      try {
        const user = new Parse.User();
        user.set("name", values.name);
        user.set("username", values.email);
        user.set("email", values.email);
        user.set("password", values.password);
        user.set("phoneNumber", values.phoneNumber);
        user.set("position", values.position);
        user.set("academyName", values.academyName);
        user.set("companyEmail", values.companyEmail);
        user.set("purpose", values.purpose);

        await user.signUp();
        props.showSuccess(props.translate("signupSuccess"));
        router.push("/login");
      } catch (error) {
        props.showError(error.message);
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <Box mb={2} textAlign="left">
            <Typography variant="h4">{props.translate("signup")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            autoComplete="name"
            name="name"
            required
            fullWidth
            label={props.translate("name")}
            size="small"
            autoFocus
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            label={props.translate("email")}
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
            label={props.translate("phoneNumber")}
            name="phoneNumber"
            autoComplete="Phone Number"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            name="password"
            label={props.translate("password")}
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
            label={props.translate("passwordConfirmation")}
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
              label={props.translate("academyName")}
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
              label={props.translate("companyEmail")}
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
              label={props.translate("purpose")}
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
            <FormLabel>{props.translate("position")}</FormLabel>

            <RadioGroup row={true} aria-label="position" name="position" value={formik.values.position} onChange={formik.handleChange}>
              <FormControlLabel value="teacher" control={<Radio />} label={props.translate("teacher")} />
              <FormControlLabel value="publisher" control={<Radio />} label={props.translate("publisher")} />
              <FormControlLabel value="etc" control={<Radio />} label={props.translate("etc")} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" color="secondary" fullWidth variant="contained">
            {props.translate("btnNext")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              {props.translate("ifAlreadyHaveAccount")} <LinkComponent href="/">{props.translate("login")}</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
