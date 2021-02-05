import React from "react";
import { Grid, MenuItem, Typography, Button, Menu, Box } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const LanguageComponent = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key) => {
    props.changeLanguage(key);
    setAnchorEl(null);
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Box mr={1}>
          <Typography variant="caption">{props.translate("app.langLabel")}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button
          onClick={handleClick}
          style={{ fontWeight: "normal", textTransform: "capitalize" }}
          size="small"
          endIcon={<ArrowDropDownIcon fontSize="small" />}
        >
          {props.router.locale === "en-US" ? props.translate("app.langEnglish") : props.translate("app.langKorean")}
        </Button>

        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem dense onClick={() => handleClose("en-US")}>
            {props.translate("app.langEnglish")}
          </MenuItem>
          <MenuItem dense onClick={() => handleClose("ko")}>
            {props.translate("app.langKorean")}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default LanguageComponent;
