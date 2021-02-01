import { Box, Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
import LanguageComponent from "../generic/LanguageComponent";

const GeneralComponent = (props) => {
  const formik = useFormik({
    initialValues: {
      name: props.user.get("name"),
      email: props.user.get("email"),
      nickName: props.user.get("student")?.get("nickname"),
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("userPages.settings.nameRequired")),
      email: yup
        .string()
        .required(props.translate("userPages.settings.emailRequired"))
        .email(props.translate("userPages.settings.emailValidate")),
      nickName: yup.string().required(props.translate("userPages.settings.nickNameRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        props.user.set("name", values.name);
        props.user.set("email", values.email);
        props.user.set("username", values.email);
        props.user.get("student").set("nickname", values.nickName);

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
                name="nickName"
                autoComplete="Nick Name"
                formik={formik}
              />
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
