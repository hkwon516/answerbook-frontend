import React from "react";
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

const Settings = (props) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box textAlign="center" m={1}>
          <Box mt={1}>
            <ButtonComponent
              onClick={() => {
                props.changePage("/signup/step2");
              }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              {props.translate("anonPages.toc.buttonTermsOfUse")}
            </ButtonComponent>{" "}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box textAlign="center" m={1}>
          <Box mt={1}>
            <ButtonComponent
              onClick={() => {
                props.changePage("/signup/step2");
              }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              {props.translate("anonPages.toc.buttonPrivacy")}
            </ButtonComponent>{" "}
          </Box>
        </Box>
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

export default Settings;
