import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Header from "../../component/common/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
  },
}));

const Toc = (props) => {
  const [value, setValue] = useState(props.router.query.tab === 'privacy' ? 1 : 0);
  const [backgroundColor, setBackgroudColor] = useState("black");

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
      <Header
        router={props.router}
        title={props.translate("anonPages.signupStep2.tocTitle")}
        hideNotificationsBell={true} />

      <Grid item xs={12} justify={"center"}>

        <Grid item xs={12}>

          <BottomNavigation
            style={{
              backgroundColor: props.theme.palette.secondary.light,
              borderRadius: "25px",
            }}
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}>

            <BottomNavigationAction label={props.translate("anonPages.signupStep2.tocHeader")} style={{ fontWeight: "bold" }} />
            <BottomNavigationAction label={props.translate("anonPages.signupStep2.privacyHeader")} style={{ fontWeight: "bold" }} />

          </BottomNavigation>

        </Grid>

      </Grid>

      <Grid item xs={12}>
        <Box m={1}>
          <Box>
            <Typography style={{ textTransform: "uppercase" }, { fontWeight: "10pt" }, { marginTop: 30 }}>
              {props.translate("anonPages.toc.textMainTitle")}
            </Typography>
          </Box>
          <Box>

            <Box mt={1}>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {props.translate("anonPages.toc.title1")}
              </Typography>
            </Box>

            <Box mt={1.5}>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {props.translate("anonPages.toc.title2")}
              </Typography>
            </Box>

            <Box mt={1}>
              <Typography variant="body2">
                {props.translate("anonPages.toc.paragraph1")}
              </Typography>
            </Box>

            <Box mt={3}>
              <Typography variant="body2" style={{ marginTop: 16 }, { fontWeight: "bold" }}>
                {props.translate("anonPages.toc.title3")}
              </Typography>
            </Box>

            <Typography variant="body2" style={{ marginTop: 16 }}>
              {props.translate("anonPages.toc.paragraph2")}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Toc;
