import {Mobile_Menu, Notification} from '../constants/action-types';

const initialState = {
    mobileMenu: true,
    toast: {status: false, message: ""}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Mobile_Menu:
            return { ...state,
                mobileMenu: action.mobileMenu
            };
        case Notification:
            return { ...state,
                toast: action.toast
            };
        default:
            return state;
    }
}