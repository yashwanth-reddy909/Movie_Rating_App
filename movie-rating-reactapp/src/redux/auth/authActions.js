import {USER_LOGIN_FAILED,USER_LOGIN_SUCCESS, USER_LOGOUT } from "./authTypes";

import axios from 'axios';
export const user_login_success=(user)=>{
    
    console.log('user trying to log in');
    return{
        type: USER_LOGIN_SUCCESS,
        payload: user
    }
}
export const user_login_failed=(mes)=>{
    return{
        type: USER_LOGIN_FAILED,
        payload: mes
    }
}
export const user_login=(user_credentials)=>{
    const url2='/backendapi/users/login';
    return async dispatch=>{
        axios.post(url2,user_credentials)
        .then(res=>{
            console.log()
            const jsonuser=JSON.stringify(res.data);
            localStorage.setItem('user', jsonuser);
            dispatch(user_login_success(res.data));
        })
        .catch(err=>{
            console.log('User login failed');
            dispatch(user_login_failed(err.message));
        });
    }
};
export const user_logout=()=>{
    localStorage.clear();
    window.location.reload();
    return{
        type: USER_LOGOUT
    }
}
