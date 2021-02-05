import { Button, Grid, Box, Tabs, Tab, IconButton, Container, Avatar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BarcodeScannerComponent from "../../component/barcode/BarcodeScannerComponent";
import ProfilePicture from "../../component/generic/ProfilePicture";

const useStyles = makeStyles({
  scrollerOverride: {
    overflow: "visible !important",
  },
});
const Dashboard = (props) => {
  const classes = useStyles();
  const [barcodeScannerOpen, setBarcodeScannerOpen] = useState(false);
  console.log(props.user.get("profilePicture"));
  return (
    <React.Fragment>
      <BarcodeScannerComponent
        open={barcodeScannerOpen}
        onClose={(code) => {
          setBarcodeScannerOpen(false);

          if (code) {
            setTimeout(() => {
              alert(code);
            }, 1000);
          }
        }}
      />
      <Grid container style={{ height: "100vh" }} direction="column" justify="space-between">
        <Grid item>
          <Box>
            <Box height={110} bgcolor="secondary.dark"></Box>
            <Container maxWidth={"xs"}>
              <Box mt={-5} mb={2}>
                <Grid container justify="center">
                  <Grid item>
                    <ProfilePicture value={props.user.get("profilePicture")?.url()} />
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
                      <Typography variant="body2">{props.user.get("student")?.get("school")?.get("name")}</Typography>
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
                      label={props.translate("userPages.home.labelHome")}
                    />
                    <Tab
                      icon={<CheckCircleOutlineIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label={props.translate("userPages.home.labelGrading")}
                    />
                    <Tab
                      component={() => (
                        <IconButton
                          size="small"
                          onClick={() => {
                            setBarcodeScannerOpen(true);
                          }}
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
                      label={props.translate("userPages.home.labelNotes")}
                    />
                    <Tab
                      icon={<AssignmentIcon style={{ color: "#fff" }} />}
                      style={{ fontWeight: 500, minHeight: 62, fontSize: 10, color: "#fff" }}
                      label={props.translate("userPages.home.labelToday")}
                    />
                  </Tabs>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
