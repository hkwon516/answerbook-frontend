import { Button, Grid, Box, Tabs, Tab, IconButton } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
const Dashboard = (props) => {
  return (
    <div>
      <Grid container style={{ height: "100vh" }} direction="column" justify="space-between">
        <Grid item>
          <Button
            onClick={() => {
              props.onLogout();
            }}
          >
            {props.translate("userPages.confirm.linkSignout")}
          </Button>
        </Grid>
        <Grid item>
          <Box pb={2} bgcolor="primary.main">
            <Tabs
              classes={{ scroller: { overflow: "visible" } }}
              style={{ overflow: "visible" }}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                icon={<HomeIcon  style={{ color: "#fff" }} />}
                style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                label="Home"
              />
              <Tab
                icon={<CheckCircleOutlineIcon  style={{ color: "#fff" }} />}
                style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                label="Grading"
              />
              <Tab
                component={() => (
                  <IconButton size="small" style={{ width: 52, height: 52, backgroundColor: props.theme.palette.secondary.main, zIndex: 1, top: -25 }}>
                    <CameraAltIcon style={{ color: "#fff" }} />
                  </IconButton>
                )}
                style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
              />
              <Tab
                icon={<BookmarkIcon  style={{ color: "#fff" }} />}
                style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                label="Notes"
              />
              <Tab
                icon={<AssignmentIcon  style={{ color: "#fff" }} />}
                style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                label="Today"
              />
            </Tabs>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
