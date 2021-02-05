import React, { useRef } from "react";
import { AppBar, Toolbar, Grid, IconButton, Box, Typography, Badge } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NotificationsIcon from "@material-ui/icons/Notifications";

const Header = (props) => {
  return (
    <React.Fragment>
      <AppBar  elevation={0} color="#fff" position="static">
        <Toolbar disableGutters>
          <Grid alignItems="center" container justify="space-between">
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  props.router.back();
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Box textAlign="center">
                <Typography style={{ overflow: "hidden" }} variant="subtitle2" color="inherit">
                  {props.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              {!props.hideNotificationsBell ? (
                <IconButton
                  onClick={() => {
                    // open drawer
                  }}
                >
                  <Badge color="secondary" variant="dot">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
