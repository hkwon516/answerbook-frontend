import { Box, Grid, Button, Avatar, colors, Paper} from "@material-ui/core";
import React, { useRef } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import GeneralComponent from "../../component/settings/GeneralComponent";
import NotificationComponent from "../../component/settings/NotificationComponent";
import SecurityComponent from "../../component/settings/SecurityComponent";
import getParse from "../../utils/parse";

const Settings = (props) => {
  const cameraRef = useRef();

  return (
    <React.Fragment>
      {props.setTitlePageKey("userPages.settings.title")}

      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Box mb={2} textAlign="center" style={{ paddingTop: "50px" }}>
              <input style={{ display: "none" }} type="file" accept="image/*;capture=camera" capture="camera" ref={cameraRef} />

              <Avatar
                onClick={() => {
                  if (cameraRef) {
                    console.log(cameraRef);
                    cameraRef.current.click();
                  }
                }}
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${colors.grey[400]}`,
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                }}
              >
                <CameraAltIcon color="primary" />
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
          <Paper elevation={1}>
          <Box p={2}>
            <GeneralComponent {...props} />
            <SecurityComponent {...props} />
            </Box>
            </Paper>
            <Box mt={2}>
              <NotificationComponent {...props} />
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
