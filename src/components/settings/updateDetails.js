import React, {Component, Fragment} from 'react';
import CommonService from '../../service/commonServices';
import RegisterForm from '../register_/registerForm'
import {Grid,Typography} from '@material-ui/core';
export default class UpdateDetails extends Component{

	constructor(props) {
	    super(props);
	    this.state = {
	    	disabled : true
	    }
	};

	render(){
		return (
			<Grid container className="registrationSection" >
	            <h2>
	                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
	                    <Typography className="loginHeading preLoginHeading" variant="title" gutterBottom align="center">
	                        Update Account Details
	                    </Typography>
	                </Grid>
	            </h2>
				<RegisterForm disabled = {this.state.disabled} />
			</Grid>
		)
	}
}