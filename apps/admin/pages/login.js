import React from "react";

import { Typography, Button, Grid, Box } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../component/generic/LinkComponent";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email("Enter a valid email"),
      password: yup.string().required(),
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
            <Typography variant="h4">Log In</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus formik={formik} />
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="right" mt={2}>
            <Box>
              <LinkComponent href="forgot/password">Forgot password?</LinkComponent>
            </Box>
            <Box>
              <LinkComponent href="forgot/email">Forgot Email?</LinkComponent>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <Button color="secondary" type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              Don't have an account? <LinkComponent href="/signup">Sign Up</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
