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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    margin: theme.spacing(2, 1, 0),
  },
  Checkbox: {
    margin: theme.spacing(1, 1, 0),
  },
}));

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      position: "teacher",
      academyName:"",
      companyEmail:"",
      purpose:"",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email("Enter a valid email"),
      phoneNumber: yup.number().required(),
      password: yup.string().required(),
      passwordConfirm: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                size="small"
                margin={
                  (formik.touched.name && formik.errors.name ? true : false)
                    ? "dense"
                    : "normal"
                }
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                autoFocus
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && formik.errors.name ? true : false}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                size="small"
                margin={
                  (formik.touched.email && formik.errors.email ? true : false)
                    ? "dense"
                    : "normal"
                }
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && formik.errors.email}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                size="small"
                margin={
                  (
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? true
                      : false
                  )
                    ? "dense"
                    : "normal"
                }
                label="Phone number"
                name="phoneNumber"
                autoComplete="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                error={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                size="small"
                margin={
                  (
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  )
                    ? "dense"
                    : "normal"
                }
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirmation"
                type="password"
                id="passwordConfirm"
                size="small"
                margin={
                  (
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                      ? true
                      : false
                  )
                    ? "dense"
                    : "normal"
                }
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                error={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                    ? true
                    : false
                }
              />
            </Grid>

            {formik.values.position === "teacher" && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="academyName"
                  label="Academy Name"
                  id="academyName"
                  size="small"
                  margin="normal"
                  autoComplete="Academy Name"
                  onChange={formik.handleChange}
                  value={formik.values.academyName}
                />
              </Grid>
            )}

            {formik.values.position === "publisher" && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="companyEmail"
                  label="Company Email"
                  id="companyEmail"
                  size="small"
                  margin="normal"
                  autoComplete="Company Email"
                  onChange={formik.handleChange}
                  value={formik.values.companyEmail}
                />
              </Grid>
            )}

            {formik.values.position === "etc" && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="purpose"
                  label="Purpose of signing up"
                  id="purpose"
                  size="small"
                  margin="normal"
                  autoComplete="purpose"
                  onChange={formik.handleChange}
                  value={formik.values.companyEmail}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <InputLabel required className={classes.label}>
                Position
              </InputLabel>
            </Grid>

            <RadioGroup
              aria-label="position"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
            >
              <Grid container className={classes.Checkbox}>
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
              </Grid>
            </RadioGroup>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Next
            </Button>

            <Grid container spacing={5} justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
