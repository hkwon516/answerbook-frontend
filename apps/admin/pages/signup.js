import React from "react";
import { LockOutlined } from "@material-ui/icons";
import {
  InputLabel,
  Typography,
  Radio,
  RadioGroup,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Link,
  Grid,
  makeStyles,
  Container,
  Box,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
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
      academyName: "",
      companyEmail: "",
      purpose: "",
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
                        Sign up
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
                  size="small"
                  autoFocus
                  formik={formik}
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
                  margin={(formik.touched.email && formik.errors.email ? true : false) ? "dense" : "normal"}
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && formik.errors.email ? true : false}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  size="small"
                  margin={(formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false) ? "dense" : "normal"}
                  label="Phone number"
                  name="phoneNumber"
                  autoComplete="Phone Number"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
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
                  margin={(formik.touched.password && formik.errors.password ? true : false) ? "dense" : "normal"}
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.password && formik.errors.password}
                  error={formik.touched.password && formik.errors.password ? true : false}
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
                  margin={(formik.touched.passwordConfirm && formik.errors.passwordConfirm ? true : false) ? "dense" : "normal"}
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                  error={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? true : false}
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
                <FormControl
                  margin={(formik.touched.position && formik.errors.position ? true : false) ? "dense" : "normal"}
                  error={formik.touched.position && formik.errors.position ? true : false}
                >
                  <FormLabel>Position</FormLabel>

                  <RadioGroup
                    row={true}
                    aria-label="position"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    <FormControlLabel value="publisher" control={<Radio />} label="Publisher" />
                    <FormControlLabel value="etc" control={<Radio />} label="ETC" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  Next
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box textAlign="right" mt={1}>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
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
