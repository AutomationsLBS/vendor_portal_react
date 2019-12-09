import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    matchPath,
    withRouter,
    Switch
} from "react-router-dom";
import MainNav from './navigation';
import Config from '../../container/config';
import Register from "../register/register";

import Contractor from '../communities/community-contractor';
import Vendor from '../communities/community-vendor';

import Account from '../account/account';
import AccountForm from '../account/accountform';
import Communities from '../communities/communities';
import Employees from "../employees/employees";
import EmployeesEdit from '../employees/employee-edit';
import EmployeesCreate from '../employees/employee-create';
import Login from "../login/login";
import Forgotpassword from "../forgotpassword/forgotpassword";
import ResetPassword from "../forgotpassword/resetPassword";
import Profile from '../profile/profile';
import ChangePassword from "../profile/changePassword";
import EditProfile from '../profile/editprofile';

import Visit from '../visits/visit';
import  Mypay   from '../mypayments/mypay';
import Vistlogouts  from "../visitorlog"
import Resident from  '../resident';
import Siginoutlog from '../siginoutlog';
import Vistlogouts from '../resident/editResidents';
import Visitlogs from "../resident/visitlogs";
import Updatepin from  "../updateNewpin/index";
import Credentails from "../credentials/credentials";
import CredentailsCreate from  "../credentials/credential-create";
import CredentailsEdit from  "../credentials/credential-edit";
import Companys  from  "../companysList/index"

import Report from '../credentials/report'
import AddAdmin from '../credentials/account/addAdmin'

export default class Approute extends Component {
    isRoute = false;
    constructor(props) {
        super(props);
        console.log("At AppRoute", props);
        debugger;
    }

    render() {
        console.log("Location---------", window.location.pathname);

        Config.mainnav.map((n, i) => {
            alert(n.name+" "+window.location.pathname)
            if (n.link == window.location.pathname && n.isLogin == true) {
                alert(n.name)
                this.isRoute = true;
                return false;
            }
        });
        console.log("Config.isRoute", this.isRoute);
        return (
            <Grid container className="bodyContainer">

                <Grid className="navContainer" item lg={2} md={2} sm={3} xs={12}>
                    <MainNav />
                </Grid>
                <Grid className="bodyContent" item lg={10} md={10} sm={9} xs={12}>
                    <Scrollbars
                        renderTrackVertical={props => <div {...props} className="track-vertical" />}>
                        <div className="bodySection">
                        <Switch>
                        <Router>
                            <Route path="/communityc" component={Contractor} />
                            <Route path="/communityv" component={Vendor} />
                            <Route path="/account" component={Account} />
                            <Route path="/account/edit/:id" component={AccountForm} />
                            <Route path="/communites" component={Communities} />
                            <Route path="/employees" component={Employees} />
                            <Route path="/employeesCreate" component={EmployeesCreate} />
                            <Route path="/employees/edit/:id" component={EmployeesEdit} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgotpassword" component={Forgotpassword} />
                            <Route path="/resetpassword" component={ResetPassword} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/profile/edit" component={EditProfile} />
                            <Route path="/profile/changepassword" component={ChangePassword} />
                            <Route path="/register" component={Register} />
                            <Route path="/credentials" component={Credentails} />
                            <Route path="/visit" component={Visit} />
                            <Route path="/mypayments" component={ Mypay} />
                            <Route path="/visitorlogs" component={ Vistlogouts} />
                            <Route path="/resident" component={ Resident} />
                            <Route path="/signoutlog" component={ Siginoutlog} />
                            <Route path="/signoutlog1" component={ Siginoutlog} />
                            <Route exact path="/resident/edit/:id" render={(props) => <Vistlogouts  {...props} />} />  
                            <Route exact path="/resident/visitorlog/:id" render={(props) => <Visitlogs  {...props} />} />  
                            <Route path="/updatenewpin" component={ Updatepin} />
                            <Route path="/credentailsCreate" component={CredentailsCreate} />
                            <Route path="/settings" component={Tab4}/>
                            <Route path="/agencyReport" component={Report}/>
                            <Route path="/addAdmin" component={AddAdmin}/>
                            <Route path="/credentialsEdit" component={CredentailsEdit}/>
                            <Route path="/companies" component={Companys}/>
                            <Route path="/for" component={Forgotpassword} />
                        
                        </Router>
                        </Switch>
                        </div>
                    </Scrollbars>
                </Grid>


            </Grid>
        );
    };
}
