import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import withApp from "../../utils/withApp";

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

export default withApp(AnonLayout);
