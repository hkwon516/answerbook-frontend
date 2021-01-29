import { Container, Grid, makeStyles, Box } from "@material-ui/core";
import React from "react";
import LanguageSwitcherComponent from "../generic/LanguageComponent";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

const AnonLayout = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid item xs={12}>
          <Box mt={6} mb={6}>
            {props.children}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box mb={2}>
            <LanguageSwitcherComponent {...props} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
