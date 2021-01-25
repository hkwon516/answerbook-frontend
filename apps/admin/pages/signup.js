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
      name: yup.string().required(props.translate("pages.anon.signup.form.validation.nameRequired")),
      email: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.emailRequired"))
        .email(props.translate("pages.anon.signup.form.validation.emailValidate")),
      phone: yup
        .number(props.translate("pages.anon.signup.form.validation.phoneValidate"))
        .required(props.translate("pages.anon.signup.form.validation.phoneRequired")),
      password: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.passwordRequired"))
        .min(6, props.translate("pages.anon.signup.form.validation.passwordLength")),
      passwordConfirm: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("pages.anon.signup.form.validation.passwordValidate")),
      academyName: yup.string().required(props.translate("pages.anon.signup.form.validation.academyNameRequired")),
      companyEmail: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.companyEmailRequired"))
        .email(props.translate("pages.anon.signup.form.validation.comapnyEmailValidate")),
      purpose: yup.string().required(props.translate("pages.anon.signup.form.validation.purposeRequired")),
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
        props.showSuccess(props.translate("pages.anon.signup.success"));
        router.push("/user");
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <Box mb={2} textAlign="left">
            <Typography variant="h4">{props.translate("pages.anon.signup.title")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            autoComplete="name"
            name="name"
            required
            fullWidth
            label={props.translate("pages.anon.signup.form.fields.name")}
            size="small"
            autoFocus
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            label={props.translate("pages.anon.signup.form.fields.email")}
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
            label={props.translate("pages.anon.signup.form.fields.phone")}
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
            label={props.translate("pages.anon.signup.form.fields.password")}
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
            label={props.translate("pages.anon.signup.form.fields.passwordConfirmation")}
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
              label={props.translate("pages.anon.signup.form.fields.academyName")}
              size="small"
              autoComplete="Company Name"
              formik={formik}
            />
          </Grid>
        )}
        {formik.values.position === "publisher" && (
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              name="companyEmail"
              label={props.translate("pages.anon.signup.form.fields.companyEmail")}
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
              required
              fullWidth
              name="purpose"
              label={props.translate("pages.anon.signup.form.fields.purpose")}
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
            <FormLabel>{props.translate("pages.anon.signup.form.fields.position")}</FormLabel>

            <RadioGroup row={true} aria-label="position" name="position" value={formik.values.position} onChange={formik.handleChange}>
              <FormControlLabel value="teacher" control={<Radio />} label={props.translate("pages.anon.signup.form.fields.teacher")} />
              <FormControlLabel value="publisher" control={<Radio />} label={props.translate("pages.anon.signup.form.fields.publisher")} />
              <FormControlLabel value="etc" control={<Radio />} label={props.translate("pages.anon.signup.form.fields.etc")} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" color="secondary" fullWidth variant="contained" disabled={formik.isSubmitting}>
            {!formik.isSubmitting ? props.translate("layout.buttons.next") : props.translate("layout.buttons.wait")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              {props.translate("pages.anon.signup.links.login")}{" "}
              <LinkComponent href="/">{props.translate("pages.anon.login.title")}</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
