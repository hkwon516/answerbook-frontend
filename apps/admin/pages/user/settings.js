import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import GeneralComponent from "../../component/settings/GeneralComponent";
import InformationComponent from "../../component/settings/InformationComponent";
import SecurityComponent from "../../component/settings/SecurityComponent";

const Settings = (props) => {
  useEffect(() => {
    props.setTitlePageKey("userPages.settings.title");
  }, [])

  return (
    <React.Fragment>

      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={4} sm={6}>
            <Box mt={2}>
              <GeneralComponent {...props} />
            </Box>
            <Box mt={2}>
              <InformationComponent {...props} />
            </Box>
            <Box mt={2} mb={2}>
              <SecurityComponent {...props} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Settings;
