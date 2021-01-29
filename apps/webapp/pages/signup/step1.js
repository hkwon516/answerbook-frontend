import React from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import Step1Graphic1 from "../../component/signup/Step1Graphic1";
import ButtonComponent from "../../component/generic/ButtonComponent";

export default function SignUp(props) {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Box>
              <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                {props.translate("anonPages.signupStep1.title")}
              </Typography>
            </Box>
            <Box mt={2.5}>
              <Typography variant="body2">{props.translate("anonPages.signupStep1.subtitle1")}</Typography>
              <Typography variant="body2">{props.translate("anonPages.signupStep1.subtitle2")}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={5}>
            <Step1Graphic1 width="100%" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={5}>
            <ButtonComponent
              onClick={() => {
                props.changePage("/signup/step2");
              }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              {props.translate("anonPages.signupStep1.buttonEmailSignup")}
            </ButtonComponent>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
