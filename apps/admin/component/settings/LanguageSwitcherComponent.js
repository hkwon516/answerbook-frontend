import React from 'react';
import { AppBar, Box, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import LanguageComponent from "../../component/generic/LanguageComponent";

const LanguageSwitcherComponent = (props) => {
    return (
        <Paper elevation={1}>
            <Box p={2} pt={1} pb={1}>
                <Typography style={{ opacity: 0.5 }} variant="body2">Language</Typography>
            </Box>
            <Divider />
            <Box p={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <LanguageComponent {...props} />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default LanguageSwitcherComponent;