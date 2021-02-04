import React, { useEffect } from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import Step1Graphic1 from "../../component/signup/Step1Graphic1";
import ButtonComponent from "../../component/generic/ButtonComponent";
import KakaoIcon from "../../component/login/KakaoIcon";

export default function SignUp(props) {
  useEffect(() => {
    props.setTitlePageKey("anonPages.signupStep2.title");
  }, []);

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
          <Box mt={2}>
            <ButtonComponent startIcon={<KakaoIcon width={24} height={24} />} fullWidth variant="outlined">
              카카오톡으로 로그인
            </ButtonComponent>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
