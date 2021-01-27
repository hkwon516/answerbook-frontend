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
          <Box>{props.children}</Box>
        </Grid>
        <Grid item xs={5}>
          <LanguageSwitcherComponent {...props} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
