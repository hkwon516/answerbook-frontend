import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import LanguageComponent from "../generic/LanguageComponent";
import { Autocomplete } from "@material-ui/lab";

const GeneralComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      name: props.user.get("name"),
      email: props.user.get("email"),
      nickname: props.user.get("student").get("nickname"),
      school: props.user.get("student").get("school").id,
      grade: props.user.get("student")?.get("grade").id,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("userPages.settings.nameRequired")),
      email: yup
        .string()
        .required(props.translate("userPages.settings.emailRequired"))
        .email(props.translate("userPages.settings.emailValidate")),
      nickname: yup.string().required(props.translate("userPages.settings.nickNameRequired")),
      school: yup.string().required("School is required"),
      grade: yup.string().required("grade field is required"),
    }),

    onSubmit: async (values, actions) => {
      try {
        // props.user.set("name", values.name);
        // props.user.set("email", values.email);
        // props.user.set("username", values.email);
        // props.user.get("student").set("nickname", values.nickname);
        // const user = await props.user.save();
        // props.setUser(user);
        // props.showSuccess(props.translate("userPages.settings.labelSuccessMessage"));
      } catch (error) {
        props.showError(error.message);
      }

      actions.setSubmitting(false);
    },
  });

  console.log("formik", formik);
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Paper elevation={1}>
        <Box p={2} pt={1} pb={1}>
          <Typography style={{ opacity: 0.5 }} variant="body2">
            {props.translate("userPages.settings.labelGeneral")}
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container>
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
              <Button type="submit" color="secondary" size="small" disabled={props.isSubmitting}>
                {!formik.isSubmitting ? props.translate("userPages.settings.buttonUpdate") : props.translate("app.buttonWait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default GeneralComponent;
