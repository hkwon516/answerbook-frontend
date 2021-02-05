import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  colors,
  FormControl,
  InputLabel,
  FormHelperText,
  Avatar,
} from "@material-ui/core";
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import LanguageComponent from "../generic/LanguageComponent";
import { Autocomplete } from "@material-ui/lab";
import ButtonComponent from "../../component/generic/ButtonComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const GeneralComponent = (props) => {
  const cameraRef = useRef();

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
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("userPages.settings.nameRequired")),
      email: yup
        .string()
        .required(props.translate("userPages.settings.emailRequired"))
        .email(props.translate("userPages.settings.emailValidate")),
      phone: yup
        .number()
        .required(props.translate("userPages.settings.phoneRequired"))
        .typeError(props.translate("userPages.settings.phoneValidate")),
      nickname: yup.string().required(props.translate("userPages.settings.nickNameRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
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
      <Grid container>
        <Grid item xs={12}>
          <Box textAlign="center">
            <input style={{ display: "none" }} type="file" accept="image/*;capture=camera" capture="camera" ref={cameraRef} />

            <Avatar
              onClick={() => {
                if (cameraRef) {
                  console.log(cameraRef);
                  cameraRef.current.click();
                }
              }}
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
