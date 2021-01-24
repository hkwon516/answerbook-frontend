import React from "react";
import { Typography, Button, Grid, makeStyles, Container, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

export default function forgotEmail(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("nameRequired")),
      phone: yup.number(props.translate("phoneValidate")).required(props.translate("phoneRequired")),
    }),
    onSubmit: async (values, actions) => {
      try {
        const user = await props.parse.Cloud.run("findEmail");
        console.log(user);
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
            <Typography variant="h4">Forgot Email</Typography>
            <Typography variant="body1">{props.translate("pageForgotEmailSubtitle")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent required fullWidth label={props.translate("name")} name="name" autoComplete="name" autoFocus formik={formik} />
        </Grid>
        <Grid item xs={12}>
          <InputComponent required fullWidth label={props.translate("phone")} name="phone" autoComplete="phone" formik={formik} />
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button color="secondary" type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
              {!formik.isSubmitting ? "Retrieve" : props.translate("btnWait")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
