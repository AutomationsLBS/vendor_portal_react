import React from 'react';
import { Grid } from '@material-ui/core';

const Footer = () => {
    return (
        <Grid container className="footerContainer">
            <Grid item lg={12} md={12} sm={12} xs={12}>
                &copy; 2019, Accushield 
            </Grid>
        </Grid>
    )
}

export {Footer}