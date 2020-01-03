import React from 'react';
import { Grid } from '@material-ui/core';
 
const Footer = () => {
    var dateformat = new Date()
   
    var eyear = (dateformat.getFullYear() );
    return (
        <Grid container className="footerContainer">
            <Grid item lg={12} md={12} sm={12} xs={12}>
                &copy; {eyear}, Accushield 
            </Grid>
        </Grid>
    )
}

export {Footer}