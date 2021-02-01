
import { Box, Grid, Button } from "@material-ui/core";
import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SecurityComponent from "../../component/settings/SecurityComponent";
import GeneralComponent from "../../component/settings/GeneralComponent";
import NotificationComponent from "../../component/settings/NotificationComponent";

const Settings = (props) => {
  return (
    <React.Fragment>
      {props.setTitlePageKey("userPages.settings.title")}

      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Box mb={2} textAlign="center" style={{ paddingTop: "50px" }}>
              <Avatar
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
            <Box mt={2}>
              <GeneralComponent {...props} />
            </Box>

            <Box mt={2}>
              <SecurityComponent {...props} />
            </Box>

            <Box mt={2}>
              <NotificationComponent {...props} />
            </Box>

            <Button onClick={() => props.onLogout()}>
            SIGN OUT
            </Button>

          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Settings;
