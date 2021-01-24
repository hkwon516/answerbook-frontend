import React from "react";
import { Typography, Button, Grid, makeStyles, Container, Box } from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

export default function forgotEmail(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(props.translate("emailRequired")).email(props.translate("emailValidate")),
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
            <Typography variant="h4">Forgot Password</Typography>
            <Typography variant="body1">{props.translate("pageForgotPasswordSubtitle")}</Typography>
          </Box>
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
          <Box mt={2}>
            <Button color="secondary" type="submit" fullWidth variant="contained">
              Send Email Link
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
