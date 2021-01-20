import React from "react";
import { LockOutlined } from "@material-ui/icons";
import {
  Typography,
  Avatar,
  Button,
  Link,
  Grid,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

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
                      <Box mb={1}>
                        <Avatar>
                          <LockOutlined />
                        </Avatar>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography component="h1" variant="h5">
                        Login
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <InputComponent
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <Box mt={3}>
                  <Button type="submit" fullWidth variant="contained">
                    Login
                  </Button>
                </Box>
              </Grid>

              <Grid item xs>
                <Box mt={2}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Box>

                <Box mt={2}>
                  <Link href="#" variant="body2">
                    Forgot Email?
                  </Link>
                </Box>

              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
