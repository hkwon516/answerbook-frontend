import { Box, Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import MaterialTable from "material-table";
import ToggleButton from "@material-ui/lab/ToggleButton";

const ManageTextbook = (props) => {
  return (
    <>
      {props.setTitlePageKey("userPages.settings.title")}
      <form noValidate>
        <Box mt={2}>
          <Grid container justify="center">
            <Grid item xs={12} md={12}>
              <Box mt={2} p={2}>
                <Paper elevation={1}>
                  <Box p={2} pt={1} pb={1} mt={4}>
                    <Typography variant="body2">
                      Register Textbook
                    </Typography>
                  </Box>
                  <Divider />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default ManageTextbook;
