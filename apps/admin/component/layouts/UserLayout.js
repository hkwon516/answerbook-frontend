import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Typography,
  colors,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import React from "react";
import withApp from "../../utils/withApp";
import { useFormik } from "formik";
import * as yup from "yup";
import Parse from "parse";
import InputComponent from "../../component/generic/InputComponent";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const UserLayout = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log(props.theme.palette.primary);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      position: "teacher",
      academyName: "",
      companyEmail: "",
      purpose: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(props.translate("nameRequired")),
      email: yup.string().required(props.translate("emailRequired")).email(props.translate("emailValidate")),
      phoneNumber: yup.number(props.translate("phoneNumberValidate")).required(props.translate("phoneNumberRequired")),
      password: yup.string().required(props.translate("passwordRequired")),
      passwordConfirm: yup
        .string()
        .required(props.translate("passwordConfirmationRequired"))
        .oneOf([yup.ref("password")], props.translate("passwordValidate")),
    }),

    onSubmit: async (values) => {
      try {
        const user = new Parse.User();
        user.set("name", values.name);
        user.set("username", values.email);
        user.set("email", values.email);
        user.set("password", values.password);
        user.set("phoneNumber", values.phoneNumber);
        user.set("position", values.position);
        user.set("academyName", values.academyName);
        user.set("companyEmail", values.companyEmail);
        user.set("purpose", values.purpose);

        await user.signUp();
        props.showSuccess(props.translate("signupSuccess"));
        router.push("/login");
      } catch (error) {
        props.showError(error.message);
      }
    },
  });

  console.log(props.children);
  return (
    <>
      <Grid container fullWidth={true}>
        <Grid item xs={12} md={2}>
          <Box bgcolor="secondary.main" height="100vh">
            <Grid container direction="column" justify="space-between" style={{ height: "100%" }}>
              <Box p={2}>
                <Grid item>
                  <Grid container>
                    <Grid item xs={12}>
                      logo
                    </Grid>
                    <Grid item xs={12}>
                      naivgation
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid item>
                <Box p={2} onClick={handleClick} fullWidth={true} bgcolor="secondary.dark" style={{ cursor: "pointer" }}>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                    <Grid container>
                      <Grid item xs={12}>
                        <List>
                          <ListItem>
                            <ListItemText secondary="Sign Out" />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Popover>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar style={{ backgroundColor: props.theme.palette.secondary.light }} size="small">
                        VV
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Box ml={1}>
                        <Typography variant="body2">Full Name</Typography>
                        <Typography variant="caption">email@example.com</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          {props.children}
        </Grid>
      </Grid>
    </>
  );
};

export default withApp(UserLayout);
