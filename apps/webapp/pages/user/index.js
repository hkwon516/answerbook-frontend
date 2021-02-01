import { Button, Grid, Box, Tabs, Tab, IconButton, Container, Avatar, Typography } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles({
  scrollerOverride: {
    overflow: "visible !important",
  },
});
const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container style={{ height: "100vh" }} direction="column" justify="space-between">
        <Grid item>
          <Box>
            <Box height={110} bgcolor="secondary.dark"></Box>
            <Container maxWidth={"xs"}>
              <Box style={{ top: -25, position: "relative" }}>
                <Grid container justify="center">
                  <Grid item>
                    <Avatar
                      alt={props.user.get("name")}
                      style={{ width: 124, height: 124 }}
                      src={"https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Grid container justify="center" alignItems="center">
                        <Grid item xs={11}>
                          <Typography gutterBottom style={{ fontSize: 24 }} variant="h5">
                            {props.user.get("name")} Answerbook
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => {
                              props.changePage("/user/settings");
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Typography variant="body2">{props.user.get("student")}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item>
          <Box pb={2} bgcolor="primary.main">
            <Container disableGutters maxWidth="md">
              <Grid justify="center" container>
                <Grid item xs={12}>
                  <Tabs
                    classes={{ scroller: classes.scrollerOverride }}
                    style={{ overflow: "visible" }}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    <Tab
                      icon={<HomeIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label="Home"
                    />
                    <Tab
                      icon={<CheckCircleOutlineIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label="Grading"
                    />
                    <Tab
                      component={() => (
                        <IconButton
                          size="small"
                          style={{ width: 52, height: 52, backgroundColor: props.theme.palette.secondary.main, zIndex: 1, top: -25 }}
                        >
                          <CameraAltIcon style={{ color: "#fff" }} />
                        </IconButton>
                      )}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                    />
                    <Tab
                      icon={<BookmarkIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label="Notes"
                    />
                    <Tab
                      icon={<AssignmentIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label="Today"
                    />
                  </Tabs>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
