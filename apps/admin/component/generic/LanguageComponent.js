import React from "react";
import { Grid, MenuItem, Typography, Button, Menu } from "@material-ui/core";
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
    <Grid container style={{ width: "100%" }} justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="caption">{props.translate("layout.language.label")}</Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={handleClick}
          style={{ fontWeight: "normal", textTransform: "capitalize" }}
          size="small"
          endIcon={<ArrowDropDownIcon fontSize="small" />}
        >
          {props.router.locale === "en-US" ? props.translate("layout.language.english") : props.translate("layout.language.korean")}
        </Button>

        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem dense onClick={() => handleClose("en-US")}>
            {props.translate("layout.language.english")}
          </MenuItem>
          <MenuItem dense onClick={() => handleClose("ko")}>
            {props.translate("layout.language.korean")}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default LanguageComponent;
