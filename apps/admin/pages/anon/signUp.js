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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { InputLabel, Typography, Radio, RadioGroup } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      position: "teacher",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div>
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
            onBlur={formik.handleBlur}
            autoFocus
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && formik.errors.name}
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
          {formik.values.position === "teacher" && (
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
          )}
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

          <RadioGroup
            aria-label="position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="teacher"
              control={<Radio />}
              label="Teacher"
            />
            <FormControlLabel
              value="publisher"
              control={<Radio />}
              label="Publisher"
            />
            <FormControlLabel value="etc" control={<Radio />} label="ETC" />
          </RadioGroup>

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
