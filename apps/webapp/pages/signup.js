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
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [grade, setGrade] = React.useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    setSchool(event.target.value);
    setGrade(event.target.value);
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
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("pages.anon.signup.form.validation.nameRequired")),
      email: yup.string().required(props.translate("pages.anon.signup.form.validation.emailRequired")),
      password: yup
        .string()
        .required(props.translate("pages.anon.signup.form.validation.passwordRequired"))
        .min(6, props.translate("pages.anon.signup.form.validation.passwordLength")),
      selectEmail: yup.string().required(props.translate("pages.anon.signup.form.validation.academyNameRequired")),
      nickname: yup.string().required("Nickname is required"),
      school: yup.string().required("School field is required")
    }),

    onSubmit: async (values, actions) => {
      try {
        const user = new Parse.User();
        user.set("name", values.name);
        user.set("username", values.email);
        user.set("email", values.email);
        user.set("password", values.password);
        user.set("phone", values.phone);
        user.set("position", values.position);
        user.set("information", { academyName: values.academyName, companyEmail: values.companyEmail, purpose: values.purpose });

        await user.signUp();
        props.showSuccess(props.translate("pages.anon.signup.success"));
        router.push("/user");
      } catch (error) {
        props.showError(error.message);
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
          <Grid item xs={12} sm={5}>
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

          <Grid item xs={12} sm={1}>
            <Box mt={3}>
              <Typography>@</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl variant="filled" margin={"normal"} fullWidth size="small">
                <InputLabel name="selectEmail" id="selectEmail">
                  Choose an email
                </InputLabel>
                <Select labelId="selectEmail" id="simple-select-filled1" value={email} onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"naver.com"}>naver.com</MenuItem>
                  <MenuItem value={"hanmail.net"}>hanmail.net</MenuItem>
                  <MenuItem value={"daum.net"}>daum.net</MenuItem>
                  <MenuItem value={"gmail.net"}>gmail.net</MenuItem>
                  <MenuItem value={"nate.com"}>nate.com</MenuItem>
                  <MenuItem value={"icloud.com"}>icloud.com</MenuItem>
                  <MenuItem value={"hotmail.com"}>hotmail.com</MenuItem>
                  <MenuItem value={"yahoo.co.kr"}>yahoo.co.kr</MenuItem>
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
                <InputLabel name="selectSchool" id="selectSchool">
                  School
                </InputLabel>
                <Select labelId="selectSchool" id="simple-select-filled2" value={school} onChange={handleChange}>
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
                <InputLabel id="selectGrade">Grade</InputLabel>
                <Select labelId="selectGrade" id="simple-select-filled3" value={grade} onChange={handleChange}>
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
