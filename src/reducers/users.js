import {
    ALL_USERS
} from '../constants/action-types';

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ALL_USERS:
            return { ...state,
                users: action.users
            };
        default:
            return state;
    }
}