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
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import WarningIcon from "@material-ui/icons/Warning";
import LanguageComponent from "../generic/LanguageComponent";
import Head from "next/head";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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

      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  };
});

const UserLayout = (props) => {
  const [accountVerification, setAccountVerification] = useState(props.user.get("emailVerified"));
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(props.isMobile ? false : true);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const drawerWidth = getDrawerWidth(props.theme);
  const popperWidth = drawerWidth - drawerWidth * 0.1;

  return (
    <>
      <Head>
        <title>{props.getTitle()}</title>
      </Head>
      <Grid container>
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
                {props.getTitle(false)}
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
            <Box bgcolor={colors.grey[200]} height="100vh">
              <Grid container direction="column" justify="space-between" style={{ height: "100%" }}>
                <Grid item>
                  <Grid container>
                    <Grid item xs={12}>
                      {/* <LogoComponent width={30} /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5}>
                        <List dense>
                          <ListItem selected button
                          onClick={() => {
                            router.push("/user/textbook");
                          }}>
                            
                            <ListItemIcon>
                              <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Textbook"></ListItemText>
                          </ListItem>
                          {/* <ListItem button>
                            <ListItemIcon>
                              <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Question"></ListItemText>
                          </ListItem> */}
                          {/* <ListItem button>
                            <ListItemIcon>
                              <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Manage Student"></ListItemText>
                          </ListItem> */}
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setAnchorEl(null);
                    }}
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
                        <ListItem>
                          <LanguageComponent {...props} />
                        </ListItem>

                        <ListItem
                          button
                          onClick={() => {
                            router.push("/user/settings");
                          }}
                        >
                          <ListItemText
                            secondaryTypographyProps={{ style: { fontWeight: 500 }, variant: "caption" }}
                            secondary={props.translate("userPages.sidebar.buttonManageAccount")}
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
                            secondary={props.translate("userPages.sidebar.buttonSignOut")}
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Popover>

                  <Box
                    p={1.5}
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                    }}
                    bgcolor={colors.grey[300]}
                    style={{ cursor: "pointer" }}
                  >
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
          <Box
            className={clsx(classes.content, {
              [classes.contentShift]: drawerOpen && !props.isMobile,
            })}
          >
            <>
              {!accountVerification && (
                <Alert
                  action={
                    <Button
                      onClick={async () => {
                        await props.parse.User.requestEmailVerification(props.user.get("username"));
                        props.showSuccess(props.translate("userPages.layout.messageVerificationEmail"));
                        setAccountVerification(true);
                      }}
                      color="inherit"
                      size="small"
                    >
                      {props.translate("userPages.layout.buttonResendVerification")}
                    </Button>
                  }
                  icon={<WarningIcon />}
                  severity="warning"
                >
                  {props.translate("userPages.layout.alertUnverifedAccount")}
                </Alert>
              )}
              {props.children}
            </>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserLayout;
