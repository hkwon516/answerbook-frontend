import React from "react";
import { Typography, Button, Grid, makeStyles, Container, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";


export default function forgotEmail(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("nameRequired")),
      phoneNumber: yup.number(props.translate("phoneNumberValidate")).required(props.translate("phoneNumberRequired")),
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
            <Typography variant="h4">Forgot Email</Typography>
            <Typography variant="subtitle1">{props.translate("pageForgotEmailSubtitle")}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            id="name"
            label={props.translate("name")}
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
            id="email"
            label={props.translate("emailAddress")}
            name="email"
            autoComplete="email"
            autoFocus
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <Button color="secondary" type="submit" fullWidth variant="contained">
              {props.translate("btnOk")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}