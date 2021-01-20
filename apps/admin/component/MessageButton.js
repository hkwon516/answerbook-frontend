import { Button, withStyles } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import { Component } from "react";
import withApp from "../utils/withApp";

class MessageButton extends Component {
    // handleClick = () => {
    //     this.props.enqueueSnackbar("Welcome to admin", { variant: "success" });
    // };

    render() {
        return (
            <Button color="primary" variant="contained" onClick={(e) => this.props.showSuccess("Success Message")}>
                Click here.
            </Button>
        );
    }
}

export default withStyles(styles)(withApp(MessageButton));
