import { Container, Grid, makeStyles, MenuItem, Select, Typography, Box, FormControl, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
  },
}));

const AnonLayout = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid item>
          <Box>{props.children}</Box>

          <Box mt={5}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography variant="body2">{props.translate("layout.language.label")}</Typography>
              </Grid>
              <Grid item>
                <Select
                  onChange={(e) => {
                    props.changeLanguage(e.target.value);
                  }}
                  variant="outlined"
                  MenuProps={{ MenuListProps: { dense: true } }}
                  value={props.router.locale}
                >
                  <MenuItem value="en-US">{props.translate("layout.language.english")}</MenuItem>
                  <MenuItem value="ko">{props.translate("layout.language.korean")}</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnonLayout;
