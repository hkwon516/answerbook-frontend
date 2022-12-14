import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  InputAdornment,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../../component/generic/LinkComponent";
import { makeStyles } from "@material-ui/core/styles";
import ButtonComponent from "../../component/generic/ButtonComponent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TocPart from "../../component/signup/TocPart";
import ProfilePicture from "../../component/generic/ProfilePicture";
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
  const emailProviders = ["naver.com", "hanmail.net", "daum.net", "gmail.com", "nate.com", "icloud.com", "hotmail.com", "yahoo.co.kr"];

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      phone: "",
      emailProvider: emailProviders[0],
      nickname: "",
      school: null,
      grade: "",
      toc: false,
      profilePicture: undefined,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("anonPages.signupStep2.nameRequired")),
      username: yup
        .string()
        .required(props.translate("anonPages.signupStep2.emailRequired"))
        .test("checkDuplicate", props.translate("anonPages.signupStep2.messageAccountExists"), function (value) {
          return new Promise(async (resolve, reject) => {
            try {
              const exists = await props.parse.Cloud.run("usernameAvailable", { username: value + "@" + this.parent.emailProvider });
              resolve(exists);
            } catch (error) {
              reject(error);
            }
          });
        }),
      password: yup
        .string()
        .required(props.translate("anonPages.signupStep2.passwordRequired"))
        .min(6, props.translate("anonPages.signupStep2.passwordLength")),
      phone: yup
        .number()
        .required(props.translate("anonPages.signupStep2.phoneRequired"))
        .typeError(props.translate("anonPages.signupStep2.phoneValidate")),

      nickname: yup.string().required(props.translate("anonPages.signupStep2.nicknameRequired")),
      school: yup.object().required(props.translate("anonPages.signupStep2.schoolRequired")),
      toc: yup.boolean().oneOf([true], props.translate("anonPages.signupStep2.tocRequired")),
      grade: yup.string().required(props.translate("anonPages.signupStep2.gradeRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        const schoolQuery = new props.parse.Query(props.parse.Object.extend("School"));
        const school = await schoolQuery.get(values.school.objectId);
        const gradeQuery = new props.parse.Query(props.parse.Object.extend("Grade"));
        const grade = await gradeQuery.get(values.grade);
        const Student = props.parse.Object.extend("Student");
        const newStudent = new Student();

        const Preferences = props.parse.Object.extend("Preferences");
        const newPreferences = new Preferences();

        newPreferences.set("solutionLike", true);
        newPreferences.set("solutionSave", true);
        newPreferences.set("solutionAlert", true);
        newPreferences.set("commentAlert", true);

        const preferences = await newPreferences.save();

        newStudent.set("school", school);
        newStudent.set("grade", grade);
        newStudent.set("nickname", values.nickname);

        const student = await newStudent.save();
        const email = values.username + "@" + values.emailProvider;
        const user = new props.parse.User();
        user.set("name", values.name);
        user.set("username", email);
        user.set("email", email);
        user.set("phone", values.phone);
        user.set("password", values.password);
        user.set("student", student);
        user.set("position", "student");
        user.set("locale", props.router.locale);
        user.set("preferences", preferences);

        if (values.profilePicture) {
          const profilePicture = new props.parse.File("profilePicture", values.profilePicture);
          user.set("profilePicture", profilePicture);
        }
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

  useEffect(() => {
    props.setTitlePageKey("anonPages.signupStep2.title");
  }, []);

  return (
    <Box p={2}>
      <Grid container>
        <Grid item xs={12}>
          <Box textAlign="right">
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
                <Box ml={1.3} mr={1.3}>
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
              <Typography gutterBottom variant="h5" style={{ textTransform: "uppercase" }}>
                {props.translate("anonPages.signupStep2.subtitle1")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">{props.translate("anonPages.signupStep2.subtitle2")}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Grid container justify={"center"}>
                <Grid item>
                  <Box mb={2}>
                    <ProfilePicture
                      value={formik.values.profilePicture}
                      setValue={(value) => {
                        formik.setFieldValue("profilePicture", value);
                      }}
                    />
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
                    name="phone"
                    label={props.translate("anonPages.signupStep2.fieldPhone")}
                    size="small"
                    autoComplete="Phone Number"
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
                    <Box mr={1} style={{ paddingTop: "18px" }}>
                      <Autocomplete
                        value={formik.values.school}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("school", newValue);
                        }}
                        id="combo-box-demo"
                        options={props.schools}
                        getOptionLabel={(option) => option.name}
                        style={{ backgroundColor: "#e3e3e3" }}
                        renderInput={(params) => <TextField {...params} label="School" variant="outlined" name="school" />}
                      />
                      {formik.touched.school && formik.errors.school && (
                        <FormHelperText error>{props.translate("anonPages.signupStep2.schoolRequired")}</FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box ml={1}>
                      <FormControl error={formik.touched.grade && formik.errors.grade} variant="filled" margin={"normal"} fullWidth>
                        <InputLabel>{props.translate("anonPages.signupStep2.fieldGrade")} </InputLabel>
                        <Select value={formik.values.grade} name="grade" onChange={formik.handleChange}>
                          {props.grades.map((grade, idx) => {
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
                      <Grid alignItems="center" container>
                        <Grid item xs={1}>
                          <Box ml={-1}>
                            <Checkbox checked={formik.values.toc} onChange={formik.handleChange} name="toc" />
                          </Box>
                        </Grid>
                        <Grid item xs={11}>
                          <TocPart strPart={props.translate("anonPages.signupStep2.labelTocPart1")} />
                          <TocPart strPart={props.translate("anonPages.signupStep2.labelTocPart2")} />
                          <TocPart strPart={props.translate("anonPages.signupStep2.labelTocPart3")} />
                          <TocPart strPart={props.translate("anonPages.signupStep2.labelTocPart4")} />
                        </Grid>
                      </Grid>
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
    </Box>
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
