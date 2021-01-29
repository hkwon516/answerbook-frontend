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
          <Typography>Manage textbook</Typography>
            <Grid item xs={12} md={12}>
              <Box mt={2} p={2}>
                

                <Paper elevation={1}>
                  <Box p={2} pt={1} pb={1} mt={4} ml={1}>
                    <Typography variant="body2">
                      Search
                      {/* {props.translate("userPages.settings.labelGeneral")} */}
                    </Typography>
                  </Box>
                  <Divider />

                  {/* <Box p={2} pt={1} pb={1}>
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>

                    <InputBase className={classes.input} placeholder="Search textbook or Publisher" style={{ width: 400 }} />
                    <Divider />
                  </Box> */}

                  
                    <MaterialTable

                      columns={[
                        { title: "Textbook title", field: "title" },
                        { title: "Subject", field: "subject" },
                        { title: "Publisher", field: "publisher" },
                        {
                          title: "Instructor",
                          field: "instructor",
                        },
                        { title: "Registered Questions", field: "registerQuestion" },
                        { title: "Put in answers", field: "putInAnswer" },
                        { title: "Open Public", field: "openPublic" },
                      ]}
                      data={[
                        {
                          title: "Ssen",
                          subject: "Math",
                          publisher: "serum",
                          instructor: "kim",
                          registerQuestion: 10,
                          putInAnswer: "p49(in progress)",
                        },
                        {
                          title: "usen",
                          subject: "path",
                          publisher: "terum",
                          instructor: "lim",
                          registerQuestion: 11,
                          putInAnswer: "p50(in progress)",
                        },
                      ]}
                      options={{
                        sorting: true,
                        showTitle: false,
                      }}
                    />
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
