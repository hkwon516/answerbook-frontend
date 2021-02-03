import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Tab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from '@material-ui/lab/TabContext';
import AppBar from '@material-ui/core/AppBar';
import TabList from '@material-ui/lab/TabList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
  },
}));

const Toc = (props) => {
  const [value, setValue] = useState(props.router.query.tab === 'privacy' ? 1 : 0);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      props.changePage('/signup/toc');
    } else {
      props.changePage('/signup/toc?tab=privacy')
    }
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Grid alignItems="center" container>
            <Grid item>
              <Box mr={2}>
                <IconButton color="primary" component="span">
                  <ArrowBackIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography variant="h6">
                  {props.translate("anonPages.signupStep2.tocTitle")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* <Grid item xs={12} sm={8}>
        <Box>
          <Typography variant="h6">
            {props.translate("anonPages.signupStep2.tocTitle")}
          </Typography>
        </Box>
      </Grid> */}

      <Grid item xs={12} justify={"center"}>
        <TabContext value={value}
          centered>
          <AppBar position="static"
            style={{
              backgroundColor: props.theme.palette.secondary.light,
              borderRadius: "25px"
            }} >
            <TabList onChange={handleChange} textColor="primary">
              <Tab label={props.translate("anonPages.signupStep2.tocHeader")} />
              <Tab label={props.translate("anonPages.signupStep2.privacyHeader")} />
            </TabList>
          </AppBar>
        </TabContext>
      </Grid>

      <Grid item xs={12}>
        <Box textAlign="center" m={1}>
          <Box>
            <Typography variant="h5" style={{ textTransform: "uppercase" }}>
              {props.translate("anonPages.signupStep1.title")}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography variant="body2">{props.translate("anonPages.signupStep1.subtitle1")}</Typography>
            <Typography variant="body2">{props.translate("anonPages.signupStep1.subtitle2")}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Toc;
