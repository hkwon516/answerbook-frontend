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
      name: yup.string().required(props.translate("anonPages.forgetEmail.nameRequired")),
      phone: yup
        .number(props.translate("anonPages.forgetEmail.phoneValidate"))
        .required(props.translate("anonPages.forgetEmail.phoneRequired")),
    }),
    onSubmit: async (values, actions) => {
      try {
        const email = await props.parse.Cloud.run("findEmail", values);
        if (email) {
          props.showSuccess(props.translate("anonPages.forgetEmail.message200"));
          props.router.push({ pathname: "/", query: { email } });
        } else {
          throw new Error(props.translate("anonPages.forgetEmail.message404"));
        }
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    props.setTitlePageKey("anonPages.forgetEmail.title");
  }, []);

  return (
    <>

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container justify={"center"}>
          <Grid item xs={12}>
            <Box mb={2} textAlign="left">
              <Typography variant="h4">{props.translate("anonPages.forgetEmail.title")}</Typography>
              <Typography variant="body1">{props.translate("anonPages.forgetEmail.subtitle")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              required
              fullWidth
              label={props.translate("anonPages.forgetEmail.fieldName")}
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
              label={props.translate("anonPages.forgetEmail.fieldPhone")}
              name="phone"
              autoComplete="phone"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                {!formik.isSubmitting ? props.translate("anonPages.forgetEmail.buttonSubmit") : props.translate("app.buttonWait")}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                {props.translate("anonPages.forgetEmail.loginPrefix")}{" "}
                <LinkComponent {...props} href="/">
                  {props.translate("anonPages.forgetEmail.linkLogin")}
                </LinkComponent>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
