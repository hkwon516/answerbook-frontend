import { Container, Grid, makeStyles, Box } from "@material-ui/core";
import React from "react";
import LanguageSwitcherComponent from "../generic/LanguageComponent";

const AnonLayout = (props) => {
  return (
    <Container disableGutters component="main" maxWidth="xs" style={{ background: "#fff", minHeight: "100vh" }}>
      <Grid container style={{height: "100%"}}>
        <Grid item>{props.children}</Grid>
        <Grid item>
          <Box mb={2} mt={2} p={2}>
            <LanguageSwitcherComponent {...props} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
