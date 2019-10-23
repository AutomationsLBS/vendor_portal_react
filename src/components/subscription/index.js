import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import CommonService from '../../service/commonServices';
import {
  
  Grid,
  
  Typography,
  
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Done from '@material-ui/icons/Done';
import Info from '@material-ui/icons/Info';
import Clear from '@material-ui/icons/Clear';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default class Chargebee extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loader: false

    }
   

 }
  componentWillMount() {
  }
  componentDidMount() {
    
  this.getApiData();

  }
   
  
  getApiData = () => {
    this.setState({loader: true});
    axios
      .get(axios.chargebeeData(),{params:this.getQueryStringParameters() })
      .then((response) => {
        this.setState({loader: false});
        if(response.message == "success" ){
            window.location.replace(window.location.origin+"/resident");
        }
      })
      .catch(error => {
        this.setState({loader: false});
   
        console.log("At First Error", error);
      });
  }
    
   getQueryStringParameters  =() => {

     let   url = window.location.href;
     let   query = window.location.search.substring(1);
    
    return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
    let [ key, value ] = param.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    return params;
  }, { });

};

  
 



  render() {
    
 
    
   
   
    return (
      
      <Grid container>
        <Grid container>
          <Grid item sm={6}>
          {CommonService.renderLoader(this.state.loader)}
            <Typography className="pageTitle titleSection" variant="title" gutterBottom>
            
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
           
            
          </Grid>
        </Grid>
      
      </Grid>
      
    );
  };
}
