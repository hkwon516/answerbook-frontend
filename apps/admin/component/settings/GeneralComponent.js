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
      id: props.user.id,
      email: props.user.get("email"),
      phone: props.user.get("phone"),
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("nameRequired")),
      email: yup.string().required(props.translate("emailRequired")).email(props.translate("emailValidate")),
      phone: yup.number(props.translate("phoneValidate")).required(props.translate("phoneRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        props.user.set("name", values.name);
        props.user.set("email", values.email);
        props.user.set("phone", values.phone);
        const user = await props.user.save();
        props.setUser(user);
        props.showSuccess("Successfully Updated");
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
            {props.translate("pages.user.settings.forms.labels.general")}
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container>
            <Grid item xs={12}>
              <InputComponent
                autoComplete="name"
                name="name"
                required
                fullWidth
                label={props.translate("pages.user.settings.forms.fields.name")}
                size="small"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                disabled
                required
                fullWidth
                label={props.translate("pages.user.settings.forms.fields.id")}
                size="small"
                name="id"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                label={props.translate("pages.user.settings.forms.fields.email")}
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
                label={props.translate("pages.user.settings.forms.fields.phone")}
                name="phone"
                autoComplete="Phone Number"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" size="small" disabled={props.isSubmitting}>
                {!formik.isSubmitting
                  ? props.translate("pages.user.settings.forms.buttons.update")
                  : props.translate("layout.buttons.wait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default GeneralComponent;
