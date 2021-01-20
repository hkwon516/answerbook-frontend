import React from "react";
import {
  Typography,
  Button,
  Grid,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

export default function forgotEmail() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      phoneNumber: yup.number().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid item>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container justify={"center"}>
              <Grid item xs={12}>
                <Box mb={3}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Typography component="h1" variant="h5">
                      Please write down your name and your phone number.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <InputComponent
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <InputComponent
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="Phone Number"
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <Box mt={3}>
                  <Button type="submit" fullWidth variant="contained">
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
