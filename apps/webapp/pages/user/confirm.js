import React from "react";
import { Typography, Button, Grid, Box, Container } from "@material-ui/core";
import ConfirmGraphic1 from "../../component/user/ConfirmGraphic1";
import ButtonComponent from "../../component/generic/ButtonComponent";
import LanguageComponent from "../../component/generic/LanguageComponent";
import LinkComponent from "../../component/generic/LinkComponent";

export default function SignUp(props) {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Grid container alignItems="center" style={{ height: "100vh" }}>
          <Grid item xs={12}>
            <Box>
              <Grid container justify={"center"}>
                <Grid item xs={10}>
                  <Box textAlign="center">
                    <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                      {props.translate("userPages.confirm.title")}
                    </Typography>
                    <Box mt={2.5}>
                      <Typography variant="body2">{props.translate("userPages.confirm.subtitle1")}</Typography>
                      <Typography variant="body2">{props.translate("userPages.confirm.subtitle2")}</Typography>
                      <Box mt={1}>
                        <Typography variant="body2">{props.translate("userPages.confirm.subtitle3")}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mt={5}>
                    <ConfirmGraphic1 />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mt={5}>
                    <ButtonComponent
                      onClick={() => {
                        props.changePage("/user/");
                      }}
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      {props.translate("userPages.confirm.buttonStart")}
                    </ButtonComponent>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <LanguageComponent {...props} />
              </Grid>

              <Grid item xs={6}>
                <Box textAlign="right">
                  <Button
                    onClick={() => {
                      props.onLogout();
                    }}
                  >
                    {props.translate("userPages.confirm.linkSignout")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
