import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Header from "../../component/common/Header";

const Toc = (props) => {
  const [value, setValue] = useState(props.router.query.tab === "privacy" ? 1 : 0);
  const [backgroundColor, setBackgroudColor] = useState("black");

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      props.changePage("/signup/toc");
    } else {
      props.changePage("/signup/toc?tab=privacy");
    }
  };

  const classes = useStyles();

  useEffect(() => {
    props.setTitlePageKey("anonPages.toc.title");
  }, []);

  return (
    <React.Fragment>
      <Header router={props.router} title={props.translate("anonPages.signupStep2.tocTitle")} hideNotificationsBell={true} />
      <Box p={2} style={{ backgroundColor: "#f5f6fa" }}>
        <Box mb={2}>
          <ButtonGroup style={{ borderRadius: 25 }} variant="contained" fullWidth color="secondary" showLabels>
            <Button
              style={{
                fontWeight: "bold",
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                backgroundColor: value === 0 ? props.theme.palette.secondary.dark : props.theme.palette.secondary.main,
              }}
            >
              {props.translate("anonPages.signupStep2.tocHeader")}
            </Button>
            <Button
              style={{
                fontWeight: "bold",
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: value === 1 ? props.theme.palette.secondary.dark : props.theme.palette.secondary.main,
              }}
            >
              {props.translate("anonPages.signupStep2.privacyHeader")}
            </Button>
          </ButtonGroup>
        </Box>

        <Paper elevation={0}>
          <Grid container>
            <Grid item xs={12}>
              <Box m={1}>
                <Box>
                  <Typography style={({ textTransform: "uppercase" }, { fontWeight: "10pt" }, { marginTop: 30 })}>
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
                    <Typography variant="body2">{props.translate("anonPages.toc.paragraph1")}</Typography>
                  </Box>

                  <Box mt={3}>
                    <Typography variant="body2" style={({ marginTop: 16 }, { fontWeight: "bold" })}>
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
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Toc;
