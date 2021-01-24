import { Box, Grid } from "@material-ui/core";
import React from "react";
import GeneralComponent from "../../component/settings/GeneralComponent";
import InformationComponent from "../../component/settings/InformationComponent";
import SecurityComponent from "../../component/settings/SecurityComponent";

const Settings = (props) => {
  return (
    <>
      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={4} sm={6}>
            <GeneralComponent {...props} />
            <Box mt={2}>
              <InformationComponent {...props} />
            </Box>
            <Box mt={2}>
              <SecurityComponent {...props} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Settings;
