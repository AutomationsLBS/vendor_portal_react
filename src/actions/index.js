import {ALL_USERS, Mobile_Menu, Notification} from '../constants/action-types';
import axios from 'axios';
import {connect, dispatch } from 'react-redux';

export const getAllUsers = allUsers => ({
    type: ALL_USERS,
    users: allUsers
});

export const toggleMobileMenu = mobileMenu => ({
    type: Mobile_Menu,
    mobileMenu: mobileMenu
});

export const toastNotify = toast => ({
    type: Notification,
    toast: toast
});
