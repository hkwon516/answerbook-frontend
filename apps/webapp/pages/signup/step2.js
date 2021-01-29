import React from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  FormControl,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  colors,
  Avatar,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../../component/generic/LinkComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import ButtonComponent from "../../component/generic/ButtonComponent";

import getParse from "../../utils/parse";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
  largeButton: {
    width: 100,
    height: 100,
  },
}));

const SignUp = (props) => {
  const emailProviders = ["naver.com", "hanmail.net", "daum.net", "gmail.net", "nate.com", "icloud.com", "hotmail.com", "yahoo.co.kr"];

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      emailProvider: emailProviders[0],
      nickname: "",
      school: "",
      grade: "",
      toc: false,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("pages.anon.signup.form.validation.nameRequired")),
      username: yup.string().required(props.translate("pages.anon.signup.form.validation.emailRequired")),
      password: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.passwordRequired"))
        .min(6, props.translate("pages.anon.signup.form.validation.passwordLength")),

      nickname: yup.string().required("Nickname is required"),
      school: yup.string().required("School field is required"),
      toc: yup.boolean().oneOf([true], "Please accept the toc inorder to continue"),
      grade: yup.string().required("grade field is required"),
    }),

    onSubmit: async (values, actions) => {
      try {
        const schoolQuery = new props.parse.Query(props.parse.Object.extend("School"));
        const school = await schoolQuery.get(values.school);
        const gradeQuery = new props.parse.Query(props.parse.Object.extend("Grade"));
        const grade = await gradeQuery.get(values.grade);
        const Student = props.parse.Object.extend("Student");
        const newStudent = new Student();

        newStudent.set("school", school);
        newStudent.set("grade", grade);
        newStudent.set("nickname", values.nickname);

        const student = await newStudent.save();
        const email = values.username + "@" + values.emailProvider;
        const user = new props.parse.User();
        user.set("name", values.name);
        user.set("username", email);
        user.set("email", email);
        user.set("password", values.password);
        user.set("student", student);
        user.set("position", "student");

        await user.signUp();

        props.showSuccess(props.translate("anonPages.signupStep2.messageSuccess"));
        props.changePage("/user/confirm");
      } catch (error) {
        if (error.code === 202) {
          props.showError(props.translate("anonPages.signupStep2.messageAccountExists"));
        } else {
          props.showError(error.message);
        }
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box textAlign="right" mt={1.17}>
            <Grid alignItems="center" container justify="flex-end">
              <Grid item>
                <Box style={{ opacity: 0.5 }}>
                  <Typography variant="body2" style={{ textTransform: "uppercase" }}>
                    <LinkComponent color="primary" href="/signup/step1">
                      Step1
                    </LinkComponent>
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box ml={1.7} mr={1.7}>
                  <Typography variant="body2" style={{ textTransform: "uppercase" }}>
                    |
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ textTransform: "uppercase", fontWeight: 700 }}>
                  Step2
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3.75} textAlign="center">
            <Box>
              <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                {props.translate("anonPages.signupStep2.subtitle1")}
              </Typography>
            </Box>
            <Box mt={2.5}>
              <Typography variant="body2">{props.translate("anonPages.signupStep2.subtitle2")}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3.35}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Grid container justify={"center"}>
                <Grid item xs={12}>
                  <Box mb={2} textAlign="center">
                    <Avatar
                      style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${colors.grey[400]}`,
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                      }}
                    >
                      <CameraAltIcon color="primary" />
                    </Avatar>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <InputComponent
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    label={props.translate("anonPages.signupStep2.fieldName")}
                    size="small"
                    autoFocus
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent
                    required
                    fullWidth
                    label={props.translate("anonPages.signupStep2.fieldUsername")}
                    size="small"
                    name="username"
                    autoComplete="username"
                    formik={formik}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Select disableUnderline value={formik.values.emailProvider} name="emailProvider" onChange={formik.handleChange}>
                            {emailProviders.map((ep, idx) => {
                              return (
                                <MenuItem dense value={ep} key={idx}>
                                  @{ep}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputComponent
                    required
                    fullWidth
                    name="password"
                    label={props.translate("anonPages.signupStep2.fieldPassword")}
                    type="password"
                    size="small"
                    autoComplete="current-password"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent
                    required
                    fullWidth
                    name="nickname"
                    label={props.translate("anonPages.signupStep2.fieldNickname")}
                    size="small"
                    autoComplete="nickname"
                    formik={formik}
                  />
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    <Box mr={1}>
                      <FormControl error={formik.touched.school && formik.errors.school} variant="filled" margin={"normal"} fullWidth>
                        <InputLabel>{props.translate("anonPages.signupStep2.fieldSchool")} </InputLabel>
                        <Select value={formik.values.school} name="school" onChange={formik.handleChange}>
                          {props.schools.map((school, idx) => {
                            console.log(school);
                            return (
                              <MenuItem key={idx} value={school.objectId}>
                                {school.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {formik.touched.school && formik.errors.school && <FormHelperText error>{formik.errors.school}</FormHelperText>}
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box ml={1}>
                      <FormControl error={formik.touched.grade && formik.errors.grade} variant="filled" margin={"normal"} fullWidth>
                        <InputLabel>{props.translate("anonPages.signupStep2.fieldGrade")} </InputLabel>
                        <Select value={formik.values.grade} name="grade" onChange={formik.handleChange}>
                          {props.grades.map((grade, idx) => {
                            console.log(grade);
                            return (
                              <MenuItem key={idx} value={grade.objectId}>
                                {grade.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {formik.touched.grade && formik.errors.grade && <FormHelperText error>{formik.errors.grade}</FormHelperText>}
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box mt={1} mb={3.3}>
                    <FormControl error={formik.touched.toc && formik.errors.toc}>
                      <FormGroup row>
                        <FormControlLabel
                          control={<Checkbox checked={formik.values.toc} onChange={formik.handleChange} name="toc" />}
                          label={props.translate("anonPages.signupStep2.labelToc")}
                        />
                      </FormGroup>
                      {formik.touched.toc && formik.errors.toc && <FormHelperText error>{formik.errors.toc}</FormHelperText>}
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <ButtonComponent type="submit" color="secondary" fullWidth variant="contained" disabled={formik.isSubmitting}>
                    {!formik.isSubmitting ? props.translate("anonPages.signupStep2.buttonSignup") : props.translate("app.buttonWait")}
                  </ButtonComponent>
                </Grid>

                <Grid item xs={12}>
                  <Box mt={2} mb={2} textAlign="center">
                    <Typography variant="body1">
                      {props.translate("anonPages.signupStep2.linkLoginText")}{" "}
                      <LinkComponent href="/">{props.translate("anonPages.signupStep2.linkLogin")}</LinkComponent>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

SignUp.getInitialProps = async () => {
  const Parse = getParse();
  const schoolQuery = new Parse.Query(Parse.Object.extend("School"));
  const schools = await schoolQuery.find();

  const gradeQuery = new Parse.Query(Parse.Object.extend("Grade"));
  const grades = await gradeQuery.find();
  return { schools: schools.map((school) => school.toJSON()), grades: grades.map((grade) => grade.toJSON()) };
};

export default SignUp;
