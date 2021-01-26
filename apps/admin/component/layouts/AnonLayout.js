import { Container, Grid, makeStyles, MenuItem, Select, Typography, Box, FormControl, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
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
        <Grid item>
          <Box>{props.children}</Box>
          <LanguageSwitcherComponent {...props} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
