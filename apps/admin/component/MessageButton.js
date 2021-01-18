import { withSnackbar } from 'notistack';
import { Button, withStyles } from '@material-ui/core';
import styles from "../styles/Home.module.css";
import { Component } from 'react';

class MessageButton extends Component {
    handleClick = () => {
        // Avoid material-ui warnings. more info: https://material-ui.com/style/typography/#migration-to-typography-v2
        // eslint-disable-next-line no-underscore-dangle
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar('Welcome to admin', { variant: 'success' });
    };

    render() {
        return (
            <Button color="primary"
                variant="contained"
                onClick={this.handleClick}>
                Click here.
            </Button>
        );
    }
}

export default withStyles(styles)(withSnackbar(MessageButton));