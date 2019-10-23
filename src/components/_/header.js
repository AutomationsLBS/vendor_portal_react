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

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
});

class Appheader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  toggleMobileMenu = () => {
    let currentMenuSate = store
      .getState()
      .default
      .mobileMenu;
    currentMenuSate = !currentMenuSate;
    store.dispatch(toggleMobileMenu(currentMenuSate));
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({open: false});
  };
  handleProfile = event => {
    window.location.pathname = "/profile";
  }
  redirectTo = event => {
    if (event) {
      window.location.pathname = event;
    } else {
      return;
    }
  }
  logoutUser() {
    setTimeout(() => {
      window
        .localStorage
        .clear();
      window.location.pathname = "/login";
    }, 1000);
  }
  goToHome = () => {
    let userData = CommonService.getToken();
    if(userData != null) {
      window.location.href = '/resident';
    }else{
      window.location.href = '/';
    }
    // window.location.href = "/";
  }

  checkProfile() {
    const {classes} = this.props;
    const {open} = this.state;
    const {anchorEl} = this.state;
    let showProfile;
    if (this.props != undefined && this.props.showProfile !== undefined) {
      showProfile = "";
    } else {
      showProfile = <div className="profileSection">
        <Button
          buttonRef={node => {
          this.anchorEl = node;
        }}
          aria-owns={open
          ? 'menu-list-grow'
          : null}
          aria-haspopup="true"
          onClick={this.handleToggle}>
          <img src={Config.images + "icons/green/user.png"} width="36"/>
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className="profileDropdown"
          style={{
          zIndex: 9999
        }}>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
              transformOrigin: placement === 'bottom'
                ? 'center top'
                : 'center bottom'
            }}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                     <MenuItem
                      onClick={(event) => {
                      this.redirectTo('/updatenewpin');
                      this.handleClose(event);
                    }}>Change Pin</MenuItem>
                   
                    <MenuItem
                      onClick={(event) => {
                      this.handleClose(event);
                      this.logoutUser()
                    }}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    }
    return showProfile;
  }
  render() {
    return (
      <Grid container className="headerContainer">
        <Grid className="headerLeftSection" item lg={2} md={2} sm={3} xs={6}>
          <a href="javascript:void(0)" onClick={this.goToHome}>
            <img src={Config.images + "logo.png"}/>
          </a>
        </Grid>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          {/* Mobile */}
          <Grid className="headerRightSection mobileNavigation" item lg={10} md={10} sm={9} xs={6}>
            {this.checkProfile()}
            <div>
              <MenuIcon className="mobileMenuIcon" onClick={this.toggleMobileMenu}/>
            </div>
          </Grid>
        </Hidden>
        <Hidden only={['xs']}>
          {/* Desktop */}
          <Grid className="headerRightSection" item lg={10} md={10} sm={9} xs={6}>
            <Grid item className="profileMenu">
              {this.checkProfile()}
            </Grid>
          </Grid>
        </Hidden>

      </Grid>
    );
  };
}

export default compose(withWidth())(Appheader);