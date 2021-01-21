import { Box, Drawer, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import withApp from "../../utils/withApp";

const useStyles = makeStyles((theme) => ({}));

const UserLayout = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Box bgcolor="secondary.main" height="100vh" p={2}>
            <Grid container direction="column" justify="space-between" style={{ height: "100%" }}>
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    logo
                  </Grid>
                  <Grid item xs={12}>
                    naivgation
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>bottom</Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default withApp(UserLayout);
