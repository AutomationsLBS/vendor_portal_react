import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Config from '../../container/config';
import CommonService from '../../service/commonServices';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

export default class MainNav extends Component {
    constructor(props){
        super(props);
        console.log("At Navigation", props);
        this.state = {
            doRedirect: false,
            redirectUrl: null,
            resident_subscription_id:0,
            mysettingStatus:"",
            access_resident_data:0,
            chargebee_status:0,
        }
        
       
      
       
    }
  
    componentDidMount() {
        console.log("In componentDidMount config")
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;
        
        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function() {
                var dropdownContent = ReactDOM.findDOMNode(this);
                console.log( dropdownContent ,"this next navigation..........")
                if (dropdownContent instanceof HTMLElement) {
                    //alert("in if ")
                    let subNav = dropdownContent.getAttribute("data-class")
                    //alert(dropdownContent.getAttribute("data-status"))
                    if(dropdownContent.getAttribute("data-status")  == "inactive" ){
                        //alert("in if if ")
                        let  child = window.document.querySelectorAll('.'+subNav);
                        for (let i = 0 ;i< child.length;i++ ){
                                child[i].classList.remove(subNav);
                                child[i].classList.add(subNav+"-active");

                        }
                        dropdownContent.setAttribute("data-status","active")


                    }else {
                        //alert("in else ")
                        let  child = window.document.querySelectorAll('.'+subNav+'-active');
                        let activeSubNav = document.getElementsByClassName("active");
                        let activeParentClassName = activeSubNav[0].getAttribute("data-class")
                        if(activeParentClassName == subNav){
                            activeSubNav[0].classList.remove(subNav+"-active");
                            activeSubNav[0].classList.add(subNav);
                        }
                        for (let i = 0 ;i< child.length;i++ ){
                                child[i].classList.remove(subNav+"-active");
                                child[i].classList.add(subNav);
                        }
                        dropdownContent.setAttribute("data-status","inactive")
                    }
                }
            });
        }
        var childSubNav = document.getElementsByClassName("active");
        console.log(childSubNav)
        let activeParentClassName = ""
        if(childSubNav.length >= 1){
            let getClassName =  childSubNav[0].getAttribute("data-class")
            //alert(getClassName)
            let hiddenSubNav =   window.document.querySelectorAll('.'+getClassName);
            for (let i = 0 ;i< hiddenSubNav.length;i++ ){
                hiddenSubNav[i].classList.remove(getClassName);
                hiddenSubNav[i].classList.add(getClassName+"-active");

            }
            for (let i = 0 ;i< dropdown.length;i++ ){
                activeParentClassName = dropdown[i].getAttribute("data-class")
                if(activeParentClassName == getClassName){
                    dropdown[i].setAttribute("data-status", " active")
                }
            }
            
        }      
    } 
    
    
     
    redirect = (event, link) => {
        event.preventDefault();
        console.log("Redirecting to", event, link); 
        this.setState({
            doRedirect: true,
            redirectUrl: link.link
        });
        // onClick={(event) => {this.redirect(event, n)}} 
    }
    
    data =()=>{
        //alert('hi');
        return false;
    }

    render() {
        const currentUrl =  window.location.pathname;
        const {doRedirect, redirectUrl} = this.state;
        let userType = Config.usertype
         if (doRedirect) {
            
            return <Redirect to={redirectUrl}/>;
        }
        let className1 ='' 
       
        return (
            <div className="mainNavigation">
               
                <ul>
                    {
                        
                        Config.mainnav.map((n, i) => {
                            console.log(n.usertype,"jjjjjj")
                            let cond = false;
                            if (n.usertype != undefined){
                                let data_types = n.usertype.split("_");
                                   cond  = (data_types.length > 1)?  true : data_types[0] == userType   
                            }
                            
                           
                        if(n.isLogin  && n.isDisplay &&  cond){
                            if(n.isSubNav){
                                
                                return <li key={i}>
                                                        
                                                 <Link to={ (false) ? "#" : n.link  }  data-class = {n.buttonClass} className={(n.link === currentUrl) ? "active": n.buttonClass} >
                                                    <img src={Config.images + "icons/white/" + n.icon} style = {{ marginLeft:'25px'}}/>
                                                    <span>{n.name}</span>
                                                </Link>
                                                </li>
                            } else if(n.buttonClass!='') {
                                return <li key={i}>
                                        <a href="javascript:void(0)" data-class = {n.childClass} data-status  = "inactive"   className={(n.link === currentUrl) ? "active": n.buttonClass} >
                                                    <img src={Config.images + "icons/white/" + n.icon} />
                                                    <span>{n.name}</span>
                                                </a>
                                    </li>
                            }else {
                                return <li key={i}>

                                <Link to={ (false) ? "#" : n.link  } className={(n.link === currentUrl) ? "active": ""} >
                                    <img src={Config.images + "icons/white/" + n.icon} />
                                    <span>{n.name}</span>
                                </Link>

                            </li>
                            }
                        }
                    })}
                </ul>
            </div>
        );
    };
}