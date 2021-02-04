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
            <Typography style={{ textTransform: "uppercase" }}>
              {props.translate("anonPages.toc.textMainTitle")}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography variant="body2" style={{ marginTop: 16 }, { fontWeight: "bold" }}>
              {props.translate("anonPages.toc.title1")}
            </Typography>

            <Typography variant="body2" style={{ marginTop: 16 }, { fontWeight: "bold" }}>
              {props.translate("anonPages.toc.title2")}
            </Typography>
            <Typography variant="body2" style={{ marginTop: 16 }}>
              {props.translate("anonPages.toc.paragraph1")}
            </Typography>

            <Typography variant="body2" style={{ marginTop: 16 }, { fontWeight: "bold" }}>
              {props.translate("anonPages.toc.title3")}
            </Typography>
            <Typography variant="body2" style={{ marginTop: 16 }}>
              The definitions of terms used in these terms and conditions are as follows.
              All. For the definition of terms in the terms and conditions other than the terms defined in each issue
              The information is in accordance with the relevant laws and regulations and service information.
              1. Contents: 「Information and communication network use promotion and information protection
              In the information and communication network according to the provisions of Article 2 (1) 1 of the Act
              With the code, text, voice, sound, image or video used
              Expressed data or information, useful in preservation and use
              In order to increase the quality of the product,
              It refers to what has been processed.
              2. Company: Those who engage in economic activities related to the “contents” industry
              Content services (including web and mobile web/app services)
              C) and a person who provides all services.
              3. Member: Signs a contract with the'company' and provides information on the'company'.
              And use the services provided by the ‘company’
              It refers to those who can.
              4. Post: Tech written in the process of using the service by the'member'
              Refers to information or materials such as text, images, audio, video, and links.
              is.
              5. My Library: List of'Contents' and'Postings' written by'Members'
              It means a virtual space that stores'water'.
              6. Pen name: A unique name given to a ‘member’ when registering as a member
              Is automatically assigned and can be changed by the'member'.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Toc;
