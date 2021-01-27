import { Box, Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../../component/generic/InputComponent";
const InformationComponent = (props) => {
  const informationPositionLabelMapping = {
    teacher: props.translate("userPages.settings.lblAcademyName"),
    publisher: props.translate("userPages.settings.lblCompanyName"),
    etc: props.translate("userPages.settings.lblPurpose"),
  };
  const informationPositionMapping = {
    teacher: "academyName",
    publisher: "companyEmail",
    etc: "purpose",
  };
  const position = props.user.get("position");
  const intialInformation = props.user.get("information");
  const positionInformation = intialInformation[informationPositionMapping[position]];

  const formik = useFormik({
    initialValues: {
      position: props.user.get("position"),
      positionInformation: positionInformation,
    },
    validationSchema: yup.object().shape({
      position: yup.string().required(props.translate("nameRequired")),
      positionInformation: yup.string().required(props.translate("emailRequired")),
    }),

    onSubmit: async (values, actions) => {
      try {
        props.user.set("information", { ...intialInformation, [informationPositionMapping[position]]: values.positionInformation });
        const user = await props.user.save();
        props.setUser(user);
        props.showSuccess(props.translate("userPages.settings.lblSuccessMsg"));
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
            {props.translate("userPages.settings.lblInformation")}
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container>
            <Grid item xs={12}>
              <InputComponent
                autoComplete="position"
                name="position"
                required
                fullWidth
                disabled
                inputProps={{ style: { textTransform: "capitalize" } }}
                label={props.translate("userPages.settings.lblPosition")}
                size="small"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <InputComponent
                required
                fullWidth
                label={informationPositionLabelMapping[position]}
                size="small"
                name="positionInformation"
                autoComplete="positionInformation"
                formik={formik}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="secondary" size="small" disabled={props.isSubmitting}>
                {!formik.isSubmitting
                  ? props.translate("userPages.settings.btnUpdate")
                  : props.translate("app.btnWait")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
};

export default InformationComponent;
