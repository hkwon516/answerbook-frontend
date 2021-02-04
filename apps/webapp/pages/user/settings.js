import { Box, Grid, Button, Avatar, colors, Paper, AppBar, Toolbar, IconButton, Typography, Badge } from "@material-ui/core";
import React, { useRef } from "react";
import GeneralComponent from "../../component/settings/GeneralComponent";
import NotificationComponent from "../../component/settings/NotificationComponent";
import SecurityComponent from "../../component/settings/SecurityComponent";
import getParse from "../../utils/parse";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NotificationsIcon from "@material-ui/icons/Notifications";
const Settings = (props) => {

  return (
    <React.Fragment>
      {props.setTitlePageKey("userPages.settings.title")}
      <AppBar elevation={0} color="transparent" position="static">
        <Toolbar>
          <Grid alignItems="center" container justify="space-between">
            <Grid item>
              <IconButton
                onClick={() => {
                  setDrawerOpen(!drawerOpen);
                }}
                
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Box textAlign="center">
                <Typography style={{ overflow: "hidden" }} variant="subtitle2" color="inherit">
                  Settings
                </Typography>
              </Box>
            </Grid>
            <Grid item >
              <IconButton
                onClick={() => {
                  setDrawerOpen(!drawerOpen);
                }}
                
              >
                <Badge color="secondary" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={3} sm={4}>
            <Box p={2}>
              <GeneralComponent {...props} />

              <NotificationComponent {...props} />

              <SecurityComponent {...props} />
            </Box>

            <Button onClick={() => props.onLogout()}>SIGN OUT</Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

Settings.getInitialProps = async () => {
  const Parse = getParse();
  const schoolQuery = new Parse.Query(Parse.Object.extend("School"));
  const schools = await schoolQuery.find();

  const gradeQuery = new Parse.Query(Parse.Object.extend("Grade"));
  const grades = await gradeQuery.find();
  return { schools: schools.map((school) => school.toJSON()), grades: grades.map((grade) => grade.toJSON()) };
};

export default Settings;
