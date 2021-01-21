import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";

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
        <Grid item>{props.children}</Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
