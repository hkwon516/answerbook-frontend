import React from "react";
import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../../component/generic/LinkComponent";

export default function forgotEmail(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("pages.anon.forgetEmail.form.validation.nameRequired")),
      phone: yup
        .number(props.translate("pages.anon.forgetEmail.form.validation.phoneValidate"))
        .required(props.translate("pages.anon.forgetEmail.form.validation.phoneRequired")),
    }),
    onSubmit: async (values, actions) => {
      try {
        const email = await props.parse.Cloud.run("findEmail", values);
        if (email) {
          props.showSuccess(props.translate("pages.anon.forgetEmail.form.messages.200"));
          props.router.push({ pathname: "/", query: { email } });
        } else {
          throw new Error(props.translate("pages.anon.forgetEmail.form.messages.404"));
        }
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("pages.anon.forgetEmail.title")}</Typography>
              <Typography variant="body1">{props.translate("pages.anon.forgetEmail.subtitle")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              label={props.translate("pages.anon.forgetEmail.form.fields.name")}
              name="name"
              autoComplete="name"
              autoFocus
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              label={props.translate("pages.anon.forgetEmail.form.fields.phone")}
              name="phone"
              autoComplete="phone"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting
                  ? props.translate("pages.anon.forgetEmail.form.fields.btnSubmit")
                  : props.translate("layout.buttons.wait")}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("pages.anon.forgetEmail.links.loginLabel")}{" "}
                <LinkComponent {...props} href="/">
                  {props.translate("pages.anon.forgetEmail.links.loginLink")}
                </LinkComponent>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
