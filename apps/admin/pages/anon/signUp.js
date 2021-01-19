import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from 'formik';

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                autoFocus
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                autoComplete="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirmation"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
              />
              <InputLabel required>Position</InputLabel>
              <FormControlLabel
                control={<Checkbox value="positionTeacher" color="primary" />}
                label="Teacher"
              />
              <FormControlLabel
                control={<Checkbox value="positionPublisher" color="primary" />}
                label="Publisher"
              />
              <FormControlLabel
                control={<Checkbox value="positionEtc" color="primary" />}
                label="ETC"
              />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            // className={classes.submit}
          >
            Next
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
