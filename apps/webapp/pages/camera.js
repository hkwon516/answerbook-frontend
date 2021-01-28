import React from "react";

import { Typography, Button, Grid, Box, IconButton} from "@material-ui/core";
import InputComponent from "../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../component/generic/LinkComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const camera = (props) => {
    const formik = useFormik({
        initialValues: {
          email: props.router.query.email || "",
          password: "",
        },
        validationSchema: yup.object().shape({
          email: yup
            .string()
            .required(props.translate("anonPages.login.emailRequired"))
            .email(props.translate("anonPages.login.emailValidate")),
          password: yup.string().required(props.translate("anonPages.login.passwordRequired")),
        }),
        onSubmit: async (values, actions) => {
          try {
            await parse.User.requestEmailVerification(values.email);
            await props.onLogin(values.email, values.password);
          } catch (error) {
            if (error.code === 101 || error.code === 205) {
              props.showError(props.translate("anonPages.login.messageInvalidCredentials"));
            } else {
              props.showError(error.message);
            }
          }
    
          actions.setSubmitting(false);
        },
      });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container justify="center">
        <Box>
            <Typography>Camera</Typography>
        </Box>
        <Grid item xs={12} >
          <Box mb={1} textAlign="center">
            
            <IconButton variant="contained" component="label">
              <CameraAltIcon />
              <input type="file" hidden />
            </IconButton>
          </Box>
        </Grid>
          
      
      </Grid>
    </form>
  );
};

export default camera;
