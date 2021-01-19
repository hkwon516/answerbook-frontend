import { withSnackbar } from "notistack";
import { Button, withStyles } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import { Component } from "react";

class MessageButton extends Component {
  handleClick = () => {
    this.props.enqueueSnackbar("Welcome to admin", { variant: "success" });
  };

  render() {
    return (
      <Button color="primary" variant="contained" onClick={this.handleClick}>
        Click here.
      </Button>
    );
  }
}

export default withStyles(styles)(withSnackbar(MessageButton));
