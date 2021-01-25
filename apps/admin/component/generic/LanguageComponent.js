import React from 'react';
import { Container, Grid, makeStyles, MenuItem, Select, Typography, Box, } from "@material-ui/core";

const LanguageComponent = (props) => {
    return (
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
    );
};

export default LanguageComponent;