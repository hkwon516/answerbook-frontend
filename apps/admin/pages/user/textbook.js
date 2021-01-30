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
            <Grid item xs={12}>
              <Box p={2} pt={0}>
                <Paper elevation={1}>
                  <MaterialTable
                    style={{height: "85vh"}}
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
