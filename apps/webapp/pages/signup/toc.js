import React, {useState} from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  FormControl,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  colors,
  Avatar,
  InputAdornment,
  FormHelperText,
  TextField,
  Tabs,
  Tab
} from "@material-ui/core";
import InputComponent from "../../component/generic/InputComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import LinkComponent from "../../component/generic/LinkComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import ButtonComponent from "../../component/generic/ButtonComponent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TocPart from "../../component/signup/TocPart";
import Step1Graphic1 from "../../component/signup/Step1Graphic1";
import KakaoIcon from "../../component/login/KakaoIcon";

const Toc = (props) => {
  const [value, setValue] = useState(props.router.query.tab === 'privacy' ? 1 : 0);
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      props.changePage('/signup/toc');
    } else {
      props.changePage('/signup/toc?tab=privacy')
    }
  };
  return (
    <Grid container>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={props.translate("anonPages.signupStep2.tocHeader")} />
        <Tab label={props.translate("anonPages.signupStep2.privacyHeader")} />
      </Tabs>
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
