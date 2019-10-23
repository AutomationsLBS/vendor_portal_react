import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    matchPath
  } from "react-router-dom";
import PropTypes from "prop-types";
import UserPage from './userPage';
import LoadSinglePage from './singlePage';
import BeforeLoginPage from './loginPage';
import Config from './config';
import CommonService from '../service/commonServices';
let params = null;
const Root = (props) => {
    console.log("At Root ", props);
        // alert("At Root Element");
    
    console.log("Window path", window.location.pathname);

    const match = matchPath(props.history.location.pathname, {
        path: '/register/:id',
        exact: true,
        strict: false
    });
    if(match !== null && match.params.id !== undefined && match.params.id != ""){
        params = match.params.id;
    }else{
        params = null;
    }
    
    

    
    if(window.location.pathname === '/'){
        let tmp = CommonService.localStore.get("userData");
        let userdata = JSON.parse(tmp.userData);
        let usertype =''
        if(userdata != null){
            usertype = userdata.type
        }

        if(CommonService.getToken() !== null){
            if(usertype == 'contractor'){
                window.location.href = "/communityc"; 
            }else if(usertype == 'vendor'){
                 window.location.href = "/communityv"; 
            }

        }else{
            window.location.href = "/login";
        }
    }
    
    let nonLoginPages = ["/login", "/register", "/register/"+params,"/forgotpassword","/chargebeedata"];
    // console.log("is Url loggedin or not", nonLoginPages.indexOf(window.location.pathname));
    if ((nonLoginPages.indexOf(window.location.pathname) === -1) && CommonService.getToken() === null) {
        window.location.href = "/login";
    }
    
    return (
        <div className="root">
            {                
                Config.mainnav.map((n, i) => {
                    if(n.isLogin){
                        // After Login
                        return (
                          <Route {...this.props} path={n.link} component={UserPage} key={i} />
                        )
                    }else{
                        // Before Login
                        if(n.template == 'single'){
                            return (
                                <Route {...this.props} path={n.link} component={LoadSinglePage} key={i}  />
                            )
                        }else if(n.template == 'beforeLogin'){
                            return (
                                <Route {...this.props} path={n.link} exact component={BeforeLoginPage} key={i}  />
                            )
                        }
                    }
                })
                
            } 

            {
                (CommonService.getToken() === null)
                            ? <Route path="/" exact component={BeforeLoginPage} />
                            : <Route path="/" exact component={UserPage} />
            }

                       
        </div>
    );
};

export default withRouter(Root);