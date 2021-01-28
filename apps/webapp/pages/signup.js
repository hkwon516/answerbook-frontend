import React from "react";
import { Typography, Button, Grid, Box, FormControl, IconButton } from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import Parse from "parse";
import { useRouter } from "next/router";
import LinkComponent from "../component/generic/LinkComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignUp(props) {
  const School = Parse.Object.extend("School");
  const school = new School();
  const query = new Parse.Query(School);

  const getSchool = async () => {
    const results = await query.find();

    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + " - " + object.get("name"));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      selectEmail: "",
      nickname: "",
      school: "",
      selectSchool: "",
      selectGrade: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("pages.anon.signup.form.validation.nameRequired")),
      email: yup.string().required(props.translate("pages.anon.signup.form.validation.emailRequired")),
      password: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.passwordRequired"))
        .min(6, props.translate("pages.anon.signup.form.validation.passwordLength")),
      // selectEmail: yup.string().required(props.translate("pages.anon.signup.form.validation.academyNameRequired")),
      nickname: yup.string().required("Nickname is required"),
      school: yup.string().required("School field is required"),
    }),

    onSubmit: async (values, actions) => {
      try {
        getSchool();

        school.set("name", values.school);

        school.save().then(
          (school) => {
            alert("Successfully data added - " + school.get("name"));
          },
          (error) => {
            alert("Failed to save the data - " + error.message);
          }
        );

        // await user.signUp();
        // props.showSuccess(props.translate("pages.anon.signup.success"));
        // router.push("/user");
      } catch (error) {
        alert(error.message);
        // props.showError(error.message);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <Box mb={2} textAlign="center">
            <Typography variant="h4">{props.translate("pages.anon.signup.answerbookTitle")}</Typography>
            <Typography variant="subtitle1">{props.translate("pages.anon.signup.answerbookSubtitle")}</Typography>

            <IconButton variant="contained" component="label" size="medium">
              <CameraAltIcon />
              <input type="file" hidden />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputComponent
            autoComplete="name"
            name="name"
            required
            fullWidth
            label={props.translate("pages.anon.signup.form.fields.name")}
            size="small"
            autoFocus
            formik={formik}
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <InputComponent
              required
              fullWidth
              label={props.translate("pages.anon.signup.form.fields.email")}
              size="small"
              name="email"
              autoComplete="email"
              formik={formik}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box ml={2}>
              <FormControl variant="filled" margin={"normal"} fullWidth size="small">
                <InputLabel>Choose an email</InputLabel>
                <Select labelId="selectEmail" id="simple-select-filled1" name="selectEmail" onChange={formik.handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"@naver.com"}>naver.com</MenuItem>
                  <MenuItem value={"@hanmail.net"}>hanmail.net</MenuItem>
                  <MenuItem value={"@daum.net"}>daum.net</MenuItem>
                  <MenuItem value={"@gmail.net"}>gmail.net</MenuItem>
                  <MenuItem value={"@nate.com"}>nate.com</MenuItem>
                  <MenuItem value={"@icloud.com"}>icloud.com</MenuItem>
                  <MenuItem value={"@hotmail.com"}>hotmail.com</MenuItem>
                  <MenuItem value={"@yahoo.co.kr"}>yahoo.co.kr</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            name="password"
            label={props.translate("pages.anon.signup.form.fields.password")}
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
            label={props.translate("pages.anon.signup.form.fields.nickname")}
            size="small"
            autoComplete="nickname"
            formik={formik}
          />
        </Grid>

        <Grid item xs={12}>
          <InputComponent
            required
            fullWidth
            name="school"
            label={props.translate("pages.anon.signup.form.fields.school")}
            size="small"
            autoComplete="School"
            formik={formik}
          />
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl variant="filled" margin={"normal"} fullWidth>
                <InputLabel>School</InputLabel>
                <Select labelId="selectSchool" id="simple-select-filled2" name="selectSchool" onChange={formik.handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>one</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box ml={2}>
              <FormControl variant="filled" margin={"normal"} fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select labelId="selectGrade" id="simple-select-filled3" name="selectGrade" onChange={formik.handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"a"}>A</MenuItem>
                  <MenuItem value={"b"}>B</MenuItem>
                  <MenuItem value={"c"}>C</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" color="secondary" fullWidth variant="contained" disabled={formik.isSubmitting}>
            {!formik.isSubmitting ? props.translate("pages.anon.signup.form.fields.btnSignup") : props.translate("layout.buttons.wait")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2} textAlign="center">
            <Typography variant="body1">
              {props.translate("pages.anon.signup.links.login")}{" "}
              <LinkComponent href="/">{props.translate("pages.anon.login.title")}</LinkComponent>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
