import { Avatar, Box, Button, Drawer, Grid, IconButton, makeStyles, Popover, Typography } from "@material-ui/core";
import React from "react";
import withApp from "../../utils/withApp";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const UserLayout = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Box bgcolor="secondary.main" height="100vh">
            <Grid container direction="column" justify="space-between" style={{ height: "100%" }}>
              <Box p={2}>
                <Grid item>
                  <Grid container>
                    <Grid item xs={12}>
                      logo
                    </Grid>
                    <Grid item xs={12}>
                      naivgation
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid item>
                <Box b={0} fullWidth={true}>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                  >
                    <Typography className={classes.typography}>SignOut</Typography>
                  </Popover>
                  <Grid onClick={handleClick}>
                    <Grid item xs={12} sm={6}>
                      <Avatar size="small">VV</Avatar>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Full Name</Typography>
                      <Typography>email@example.com</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default withApp(UserLayout);
