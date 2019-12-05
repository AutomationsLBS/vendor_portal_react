import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {toastNotify} from '../../actions';
import store from '../../store';
// import {connect, dispatch  } from 'react-redux';
import {getAllUsers} from '../../actions';
import CommonService from './../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import commonModal from '../_/commonModal';



import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,

  
} from '@material-ui/core';

export default class Idbasedvalues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader : true,
      mycommunitys:"",
      communitId:"",
    }
  }
  componentWillMount() {
  
    
  }
  componentDidMount() {
    

    this.credentails( this.getParams());   
    
  }
   credentails  = (data)=>{
    var companyId = CommonService.localStore.get("usr_company_id").usr_company_id
    axios
    .get(axios.myCommunitys(),{params : {'vendor_id':data,company_id:companyId}
    })
    .then((response) => {
         console.log(response,"test__")
        this.setState({mycommunitys: response, loader: false});
        toast.success(
            (response.message != undefined) 
                ? "Successfully..." 
                : response.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'rotateY animated'
          });
       
    })
    .catch((error) => {
       
        this.setState({loader: false});
        toast.error((error.message != undefined) ? error.toString() : "Failed for some reason", {
            position: toast.POSITION.TOP_CENTER
          });
        
    });
   }

  getParams =()=> {
       
    let id  = this.props.history.location.pathname.split("/")
    console.log( id," kranthis----")
    this.setState({communitId:id[3]})
    console.log(this.state.communitId,"iikt");

   return id[3]
  }



  backButton =()=>{
    this.setState({
      backButton:true

    })

  }


 

  render() {

    if (this.state.backButton) {
      return(<Redirect to='/employees' />)
    }
    
    return (
      <Fragment>
         <Grid container>
          <Grid item sm={6}>
           
            <h2>
              <Typography className="pageTitle titleSection" variant="title" gutterBottom>
               Communities  of { CommonService.localStore.get("employeeName_co").employeeName_co}
              </Typography>
            </h2>
          </Grid>   


          <Grid item xs={6} sm={6} align="right">
              <Button className="btn btn-primary btn-round" id="addCred"
              onClick={this.backButton}>Back</Button>
             {CommonService.renderLoader(this.state.loader)}

            </Grid>
            
             <Grid item sm={12} align="right"> 
            <Table className="listTable">
              <TableHead>
                <TableRow>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone no.</TableCell>
                  <TableCell> Last Visited </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
              {  (this.state.mycommunitys)  ?  (this.state.mycommunitys.communities.length > 0)?
                 
                
                 (this.state.mycommunitys.communities.map((data)=>{
                  return (
                    <TableRow  >
                    <TableCell> { data["community"]["name"]}</TableCell>
                    <TableCell> { (data["community"].shipping_city)? data["community"].shipping_city+"," :""  }{ (data["community"].shipping_street)? data["community"].shipping_street+"," : ""}{(data["community"].shipping_state_abbr)? data["community"].shipping_state_abbr+",":"" }{(data["community"].shipping_zip)? data["community"].shipping_zip+"," : "" } </TableCell>
                    <TableCell> { (data.phone_num)?data.phone_num: "---"} </TableCell>
                    <TableCell> {  (data.last_visit_date)?  data.last_visit_date:"---"}</TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                    </TableRow >
                   )

                   
              }))  : 
                    <TableRow >
                    <TableCell colSpan={6}> <center>No Records</center> </TableCell>
                    </TableRow>  

                : 
                <TableRow >
                <TableCell colSpan={6}> <center>No Records</center> </TableCell>
                </TableRow>  
                }
              </TableBody>
             </Table>
          </Grid>
        </Grid>

        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}