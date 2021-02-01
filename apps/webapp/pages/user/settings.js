import { Box, Grid } from "@material-ui/core";
import React from "react";
import SecurityComponent from "../../component/settings/SecurityComponent";

const Settings = (props) => {
  return (
    <React.Fragment>
      {props.setTitlePageKey("userPages.settings.title")}

      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={4} sm={6}>
            <Box mt={2}>
              <SecurityComponent {...props} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Settings;
