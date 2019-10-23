import React, {Component, Fragment} from 'react';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  Grow,
  ClickAwayListener,
  Popper,
  Paper,
  Hidden,
  withWidth
} from '@material-ui/core';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';
import MainNav from './navigation';
import Config from '../../container/config';
import MenuIcon from '@material-ui/icons/Menu';
import {toggleMobileMenu} from '../../actions';
import store from '../../store';
import CommonService from '../../service/commonServices';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../visitorlog/visit.scss';

class Fliters extends  Component{
  constructor(props){
      super(props);
      this.state = {
      
      }
    }

     render(){
         return (
             <Fragment>
                  <Grid item sm={12} className={ 
																 "filterContainer active"
																}>
              <Grid  className="filterContent">
					
					<div className="filterFields">
					
						<div className="filterItem">
							<label>Start Date:</label>
              
              
							<div className="startDate">
								<DatePicker
								placeholderText="Start Date"
								selected={this.props.startDate}
                                onChange={() => { this.props.handleSelectedDate('start') }
                                }
                                dateFormat="MM/DD/YYYY"
								/>
							</div>
              <label style={{"padding-left":"11px"}}>End Date:</label>
							<div className="endDate">
								<DatePicker
								placeholderText="End Date"
								selected={this.props.endDate}
								onChange={this.props.endHandleSelectedDate('end')}
								dateFormat="MM/DD/YYYY"
								minDate={this.props.startDate}/>
							</div>
						</div>

            <div className="filterItem">
							<button style ={{ height :"31px",
                        width:" 81px",
                      "background-color": "#56b16f",
                                 color: "white",
                         }}
     onClick={this.props.doFilter}>Submit</button>
					</div>

					</div>
					
				</Grid>
        </Grid>
             
   
                 </Fragment>
         )
     }
  }
  



export default Fliters