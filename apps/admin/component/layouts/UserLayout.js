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
import React, { useEffect } from "react";
import withApp from "../../utils/withApp";
import { useFormik } from "formik";
import * as yup from "yup";
import Parse from "parse";
import InputComponent from "../../component/generic/InputComponent";

const useStyles = makeStyles((theme) => ({}));

const UserLayout = (props) => {
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
      <Grid container fullWidth={true}>
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
                        {props.user.get("name").split("")[0].toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Box ml={1}>
                        <Typography variant="body2">{props.user.get("name")}</Typography>
                        <Typography variant="caption">{props.user.getEmail()}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          {props.children}
        </Grid>
      </Grid>
    </>
  );
};

export default withApp(UserLayout);
