import { Box, Grid, Select, MenuItem, TextField, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import { Autocomplete } from "@material-ui/lab";
import ButtonComponent from "../../component/generic/ButtonComponent";
import ProfilePicture from "../generic/ProfilePicture";

const GeneralComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      name: props.user.get("name"),
      email: props.user.get("email"),
      phone: props.user.get("phone"),
      nickname: props.user.get("student").get("nickname"),
      school: props.user.get("student").get("school").id,
      grade: props.user.get("student")?.get("grade").id,
      currentPassword: "",
      password: "",
      passwordConfirm: "",
      profilePicture: undefined,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("userPages.settings.nameRequired")),
      email: yup
        .string()
        .required(props.translate("userPages.settings.emailRequired"))
        .email(props.translate("userPages.settings.emailValidate"))
        .test("checkDuplicate", props.translate("userPages.settings.messageAccountExists"), (username) => {
          return new Promise(async (resolve, reject) => {
            try {
              const exists = await props.parse.Cloud.run("usernameAvailable", { username });
              resolve(exists);
            } catch (error) {
              reject(error);
            }
          });
        }),
      phone: yup
        .number()
        .required(props.translate("userPages.settings.phoneRequired"))
        .typeError(props.translate("userPages.settings.phoneValidate")),
      nickname: yup.string().required(props.translate("userPages.settings.nickNameRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        if (values.profilePicture) {
          const profilePicture = new props.parse.File("profilePicture", values.profilePicture);
          props.user.set("profilePicture", profilePicture);
        }

        const schoolQuery = new props.parse.Query(props.parse.Object.extend("School"));
        const school = await schoolQuery.get(values.school);
        const gradeQuery = new props.parse.Query(props.parse.Object.extend("Grade"));
        const grade = await gradeQuery.get(values.grade);

        props.user.get("student").set("school", school);
        props.user.get("student").set("grade", grade);

        props.user.set("name", values.name);
        props.user.set("email", values.email);
        props.user.set("phone", values.phone);
        props.user.set("username", values.email);
        props.user.get("student").set("nickname", values.nickname);
        const user = await props.user.save();
        props.setUser(user);
        props.showSuccess(props.translate("userPages.settings.labelSuccessMessage"));
      } catch (error) {
        props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify="center">
        <Grid item>
          <Box mb={1} textAlign="center">
            <ProfilePicture
              value={formik.values.profilePicture}
              src={props.user.get("profilePicture")?.url()}
              setValue={(value) => {
                formik.setFieldValue("profilePicture", value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            label={props.translate("userPages.settings.fieldEmail")}
            size="small"
            name="email"
            autoComplete="email"
            formik={formik}
          />
        </Grid>

        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            size="small"
            label={props.translate("userPages.settings.fieldPhone")}
            name="phone"
            autoComplete="Phone Number"
            formik={formik}
          />
        </Grid>

        <Grid item xs={12}>
          <InputComponent
            autoComplete="name"
            name="name"
            required
            fullWidth
            label={props.translate("userPages.settings.fieldName")}
            size="small"
            formik={formik}
          />
        </Grid>

        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            size="small"
            label={props.translate("userPages.settings.fieldNickName")}
            name="nickname"
            autoComplete="Nick Name"
            formik={formik}
          />
        </Grid>

        <Grid item xs={12}>
          <Box mt={1}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth error={formik.touched.school && formik.errors.school}>
                  <Autocomplete
                    onBlur={() => {
                      formik.setFieldTouched("school", true);
                    }}
                    value={formik.values.school ? props.schools.find((school) => school.objectId === formik.values.school) : undefined}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        formik.setFieldValue("school", newValue.objectId);
                      } else {
                        formik.setFieldValue("school", undefined);
                      }
                    }}
                    options={props.schools}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <React.Fragment>
                        <TextField {...params} label={props.translate("userPages.settings.fieldSchool")} variant="filled" />
                      </React.Fragment>
                    )}
                  />

                  {formik.touched.school && formik.errors.school && <FormHelperText error>{formik.errors.school}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl error={formik.touched.grade && formik.errors.grade} variant="filled" fullWidth>
                  <InputLabel>{props.translate("userPages.settings.fieldGrade")} </InputLabel>
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
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <ButtonComponent type="submit" fullWidth variant="contained" color="secondary" disabled={formik.isSubmitting}>
              {!formik.isSubmitting ? props.translate("userPages.settings.buttonUpdate") : props.translate("app.buttonWait")}
            </ButtonComponent>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default GeneralComponent;
