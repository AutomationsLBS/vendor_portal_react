import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import compose from 'recompose/compose';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Hidden,
  withWidth
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';

import MainNav from '../components/_/navigation';
import MobileNav from '../components/_/mobileNavigation';
import Header from '../components/_/header';
import {Footer} from "../components/_/elements";
import "../scss/userStyles.scss";

import Contractor from '../components/communities/community-contractor';
import Vendor from '../components/communities/community-vendor';

import Visit from '../components/visits/visit';
import Employees from '../components/employees/employees';
import EmployeesCreate from '../components/employees/employee-create';
import EmployeesEdit from '../components/employees/employee-edit';
import Account from '../components/account/account';
import AccountForm from '../components/account/accountform';
import Profile from '../components/profile/profile';
import ChangePassword from '../components/profile/changePassword';
import EditProfile from '../components/profile/editprofile';
import Communites from '../components/communities/communities';
import CommonService from '../service/commonServices';
import Mypayments from '../components/mypayments/mypay';
import Vistlogouts from  '../components/visitorlog';
import Resident from  '../components/resident';
import Register  from "../components/register/register"
import Editcreatedcard from  '../components/resident/editResidents'
import Siginoutlog from '../components/siginoutlog'
import { ToastContainer, toast } from 'react-toastify';
import Visitlogs from "../components/resident/visitlogs";
import SignOutlogs from "../components/resident/signioutlogs";
import UpdateCardDetails from "../components/_/CardDetails";
import Updatepin from "../components/updateNewpin";
import Credentails from "../components/credentials/credentials";
import CredentailsCreate from "../components/credentials/credential-create"
import Report from '../components/credentials/report'
import AddAdmin from '../components/account/addAdmin'
import PaymentHistory from '../components/settings/payment-history'
import UpdateDetails from '../components/settings/updateDetails'
import CredentailsEdit from  "../components/credentials/credential-edit";
import AgCredentails from  "../components/credentials/agency_credentails";
import IdbasedvaluesCommunitys from '../components/communities/idbasedCommunitys';
import IdbasedvaluesCredentails  from '../components/credentials/idbasedcredentials';
import EditCredentials from  "../components/credentials/credential-edit";
import EmployeeBasedCommunity from "../components/employees/employeeBasedCommunitys";
import UpdateProfile from "../components/updateNewpin/updateProfile";
import EmployeeEdit from "../components/employees/editEmployee";
import ForgotPassword from  "../components/forgotpassword/forgotpassword";

import CompanysList from  "../components/companysList/index";


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class userPage extends Component {
  constructor(props) {
    super(props);
  };
  loadComponent = () => {
    const path = this.props.location.pathname;
    
    if (path.indexOf('/communityc') !== -1) {
      return (
        <div><Contractor {...this.props}/></div>
      );
    }

    else if (path.indexOf('/companies')!== -1){
      console.log("in egrer")
      return(
        <div><CompanysList /></div>
      )
    }
    else if (path.indexOf('/agencyReport') !== -1) {

      
      return (
        <div><Report {...this.props}/></div>
      );
    }


    else if (path.indexOf('/agCredentials') !== -1) {

      var credentails  = path.split('/');
      if (credentails .length > 2) {
       
        switch (credentails[2]) {

         
          case "credentials":
            return (
              <div> <IdbasedvaluesCredentails {...this.props} /></div>
            );
            
            break;
            case "editCredentials":
            return (


              <div> <EditCredentials {...this.props} /></div>
            );
            
            break;
          default:
            return false;
        }
      } else {
        
        return (
          <div><AgCredentails {...this.props}/></div>
        );
      }


      
    }
    else if (path.indexOf('/communityv') !== -1) {



      var communityv  = path.split('/');
      if (communityv .length > 2) {
       
        switch (communityv[2]) {

         
          case "communityvlist":
            return (
              <div> <IdbasedvaluesCommunitys {...this.props} /></div>
            );
            
            break;
          default:
            return false;
        }
      } else {
        
        return (
          <div><Vendor {...this.props}/></div>
        );
      }
    
    }
    else if (path.indexOf('/employeesCreate')!== -1){
      console.log("in egrer")
      return(
        <div><EmployeesCreate /></div>
      )
    }
    else if (path.indexOf('/credentialsCreate')!== -1){
      console.log("in CredentailsCreate")
      return(
        <div><CredentailsCreate /></div>
      )
    }
    else if (path.indexOf('/credentialsEdit')!== -1){
      console.log("in CredentailsCreate")
      return(
        <div><CredentailsEdit /></div>
      )
    }
    else if (path.indexOf('/credentials')!== -1){
      console.log("in egrer")
      return(
        <div><Credentails /></div>
      )
    }
   
    else if (path.indexOf('/employees') !== -1){
      
      var employeePath  = path.split('/');
      if (employeePath .length > 2) {
       
        switch (employeePath[2]) {

         
          case "empBasedList":
            return (
              <div> <EmployeeBasedCommunity {...this.props} /></div>
            );
            
            break;

            case "editEmployee":
            return (
              <div> <EmployeeEdit {...this.props} /></div>
            );
            
            break;

           
          default:
            return false;
        }
      } else {
        
        return (
          <div><Employees /></div>
        );
      }


    }
   
    
    else if (path.indexOf('/visitorlogs') !== -1){
    
      return (
        
        <div><Vistlogouts /></div>
      );
    }

    else if (path.indexOf('/updatenewpin') !== -1){
     console.log("in updatenewpin::")
      return (
        
        <div> <Updatepin  {...this.props }/> </div>
      );
    }

    else if (path.indexOf('/updateProfile') !== -1){
      console.log("in updateProfile::")
       return (
         
         <div> <UpdateProfile  {...this.props }/> </div>
       );
     }
 
    else if (path.indexOf('/forgotpassword') !== -1) {
      console.log("thisss","kranthi_");
      return (
        <div><ForgotPassword {...this.props}/></div>
      );
    }
    else if (path.indexOf('/addAdmin') !== -1) {
      return (
        <div><AddAdmin {...this.props}/></div>
      );
    }
     else if (path.indexOf('/mypayments') !== -1) {
      return (
        <div><UpdateCardDetails {...this.props}/></div>
      );
    }
    else if (path.indexOf('/paymenthistory') !== -1) {
      return (
        <div><PaymentHistory {...this.props}/></div>
      );
    }
    else if (path.indexOf('/updateDetails') !== -1) {
      return (
        <div><UpdateDetails {...this.props}/></div>
      );
    }

   
    
  }


  render() {
    return (
      <div>
        <Header {...this.props} />
        <Grid container className="bodyContainer">

          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <Grid className="navMobileContainer" item lg={12} md={12} sm={12} xs={12}>
              <MobileNav {...this.props} />
            </Grid>
          </Hidden>
          <Hidden only={['xs']}>
            <Grid className="navContainer" item lg={3} md={3} sm={3} xs={12}>
              <MainNav {...this.props}/>
            </Grid>
          </Hidden>
          <Grid className="bodyContent" item lg={9} md={9} sm={9} xs={12}>
            <Scrollbars
              renderTrackVertical={props => <div {...props} className="track-vertical"/>}>
              <div className="bodySection">
                {this.loadComponent()}
              </div>
            </Scrollbars>
          </Grid>
        </Grid>
        <Footer/>
        <ToastContainer autoClose={8000} />
      </div>
    );
  }
}

export default compose(withStyles(styles), withWidth(),)(userPage);
