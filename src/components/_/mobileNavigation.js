import React, {Component, Fragment} from 'react';
import Config from '../../container/config';
import CSSTransitionGroup from 'react-transition-group';
import {Link} from "react-router-dom";
import store from '../../store';
import {toggleMobileMenu} from '../../actions';
import ReactDOM from 'react-dom'

export default class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    console.log("At Constructore", props, store.getState());
    console.log("At Navighation STate", this.state);
  }

  toggleMenu = () => {
    let currentMenuSate = store
      .getState()
      .default
      .mobileMenu;
    currentMenuSate = !currentMenuSate;
    store.dispatch(toggleMobileMenu(currentMenuSate));
  }

  delayRedirect = event => {
    const { history: { push } } = this.props;
    /* event.preventDefault(); */
    setTimeout((to)=>push(to), 1000);
  }

 componentDidMount() {
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
  // "menuHolder showMenu"
  showMobileMenu = () => {
    const currentUrl = this.props.match.url;
    return (
      <div
        className={(store.getState().default.mobileMenu)
        ? "menuHolder"
        : "menuHolder showMenu"}>
        <div className="mask"></div>
        <div className="menuControls">
          <a href="javascript:void(0)" onClick={this.toggleMenu}>X</a>
        </div>
        <ul>
          {Config
            .mainnav
            .map((n, i) => {
              if(n.isLogin && !n.hasOwnProperty('child') && n.isDisplay){
                           
                            if(n.isSubNav){
                                
                                return <li key={i}>
                                                        
                                                 <Link to={ (false) ? "#" : n.link  } data-class = {n.buttonClass} className={(n.link === currentUrl) ? "active": n.buttonClass} >
                                                    <img src={Config.images + "icons/white/" + n.icon} style = {{ marginLeft:'15px'}}/>
                                                    <span>{n.name}</span>
                                                </Link>
                                                </li>
                            } else if(n.buttonClass!='') {
                                return <li key={i}>
                                        <a href="javascript:void(0)" data-class = {n.childClass} data-status  = "inactive"   className={(n.link === currentUrl) ? "active": n.buttonClass} >
                                                    <img src={Config.images + "icons/white/" + n.icon}  />
                                                    <span>{n.name}</span>
                                                </a>
                                    </li>
                            } 
                            else {
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
    )
  }
  render() {
    return (
      <Fragment>
        <div className="mainMobileNavigation">
          {/* <div className="toggleMenu" onClick={this.toggleMenu}>Show Menu</div> */}
          {this.showMobileMenu()}
        </div>
      </Fragment>
    );
  };
}