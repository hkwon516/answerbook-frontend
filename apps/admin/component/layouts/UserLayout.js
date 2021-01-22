import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Typography,
  colors,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
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
  console.log(props.theme.palette.primary);
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
                <Box p={2} onClick={handleClick} fullWidth={true} bgcolor="secondary.dark" style={{ cursor: "pointer" }}>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    elevation={1}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <List>
                          <ListItem>
                            <ListItemText secondary="Sign Out" />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Popover>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar style={{ backgroundColor: props.theme.palette.secondary.light }} size="small">
                        VV
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Box ml={1}>
                        <Typography variant="body2">Full Name</Typography>
                        <Typography variant="caption">email@example.com</Typography>
                      </Box>
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
