import React from 'react';
import { Grid } from '@material-ui/core';
 
const Footer = () => {
    var dydate= new Date()
   
    var dyyear = (dydate.getFullYear() );
    return (
        <Grid container className="footerContainer">
            <Grid item lg={12} md={12} sm={12} xs={12}>
                &copy; {dyyear}, Accushield 
            </Grid>
        </Grid>
    )
}

export {Footer}