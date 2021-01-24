import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Popover,
  Typography,
  colors,
  List,
  ListItemText,
  ListItem,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import React, { useContext } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useRouter } from "next/router";

const getDrawerWidth = (theme) => theme.breakpoints.values.sm / 2;
const useStyles = makeStyles((theme) => {
  const drawerWidth = getDrawerWidth(theme);
  return {
    root: {
      display: "flex",
    },
    appBar: {
      overflow: "hidden",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  };
});

const UserLayout = (props) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(props.isMobile ? false : true);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "simple-popover" : undefined;

  const drawerWidth = getDrawerWidth(props.theme);
  const popperWidth = drawerWidth - drawerWidth * 0.1;

  return (
    <>
      <Grid
        container
        onClick={() => {
          if (anchorEl) handleClose();
        }}
      >
        <Grid item xs={12}>
          <AppBar
            className={clsx(classes.appBar, {
              [classes.appBarShift]: drawerOpen,
            })}
            elevation={0}
            color="transparent"
            position="static"
          >
            <Toolbar variant="dense" style={{ opacity: drawerOpen && props.isMobile ? 1 : 0.3 }}>
              <IconButton
                onClick={() => {
                  setDrawerOpen(!drawerOpen);
                }}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography style={{ overflow: "hidden" }} variant="subtitle2" color="inherit">
                My Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            open={drawerOpen}
            variant="persistent"
          >
            <Box bgcolor={colors.grey[200]} height="100vh" op>
              <Grid container direction="column" justify="space-between" style={{ height: "100%" }}>
                <Box p={3}>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={12}>
                        {/* <LogoComponent width={30} /> */}
                      </Grid>
                      <Grid item xs={12}>
                        {/* <Box mt={5}>
                        <List dense>
                          <ListItem selected button>
                            <ListItemIcon>
                              <CollectionsBookmarkIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Textbook"></ListItemText>
                          </ListItem>
                          <ListItem button>
                            <ListItemIcon>
                              <CollectionsBookmarkIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Question"></ListItemText>
                          </ListItem>
                          <ListItem button>
                            <ListItemIcon>
                              <CollectionsBookmarkIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Student"></ListItemText>
                          </ListItem>
                        </List>
                      </Box> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Grid item>
                  <Box p={1.5} onClick={handleClick} bgcolor={colors.grey[300]} style={{ cursor: "pointer" }}>
                    <Popover
                      id={id}
                      open={popoverOpen}
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
                      <Box width={popperWidth}>
                        <List disablePadding dense>
                          <ListItem
                            button
                            onClick={() => {
                              router.push("/user/settings");
                            }}
                          >
                            <ListItemText
                              secondaryTypographyProps={{ style: { fontWeight: 500 }, variant: "caption" }}
                              secondary="Manage Account"
                            />
                          </ListItem>
                          <ListItem
                            button
                            onClick={() => {
                              props.onLogout();
                            }}
                          >
                            <ListItemText
                              secondaryTypographyProps={{ style: { fontWeight: 500 }, variant: "caption" }}
                              secondary="Signout"
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Popover>
                    <Box style={{ opacity: 0.8 }}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Avatar
                            style={{ backgroundColor: props.theme.palette.secondary.light, color: props.theme.palette.secondary.dark }}
                            size="small"
                          >
                            {props.user.get("name").split("")[0].toUpperCase()}
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Box ml={0.75}>
                            <Box mb={-0.3}>
                              <Typography style={{ lineHeight: 0, fontWeight: 500 }} variant="caption">
                                {props.user.get("name")}
                              </Typography>
                            </Box>
                            <Typography variant="caption">{props.user.getEmail()}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Drawer>
          <main
            className={clsx({
              [classes.content]: !props.isMobile,
              [classes.contentShift]: drawerOpen,
            })}
          >
            {props.children}
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default UserLayout;
