
import {USER_LOGIN_FAILED,USER_LOGIN_SUCCESS, USER_LOGOUT } from "./authTypes";

const intialState={
    err: '',
    user: {},
    isLogged: false
}

const authReducer = (state=intialState,action) =>{
    switch(action.type){
        case USER_LOGIN_SUCCESS : return{
           ...state,
           user: action.payload,
           isLogged: true,
           err: ''
        };
        case USER_LOGIN_FAILED: 
        document.getElementById('usernameincorrect').innerHTML='User Credentials are Incorrect!';
        return{
            ...state,
            isLogged: false,
            err: 'Username or password incorrect'
        };
        case USER_LOGOUT: return intialState;
        case 'CHANGE_ACCOUNTDETAILS':
            const loggedInUser = localStorage.getItem('user');
            const user_credentials=JSON.parse(loggedInUser);
            const k={...user_credentials,userName: action.payload.username,userFirstName: action.payload.firstname,userLastName: action.payload.lastname};
            const jsonuser=JSON.stringify(k);
            localStorage.setItem('user', jsonuser);
        return{
            ...state,
            user: {...state.user,userName: action.payload.username,userFirstName: action.payload.firstname,userLastName: action.payload.lastname}
        }
        default : return state;
}
}

export default authReducer;