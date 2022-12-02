import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { user_login_success } from "../redux/auth/authActions";
import { fetch_fm } from "../redux/favoritemovies/favoriteActions";

const LogC=(props)=>{
    const history= useHistory();
    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user_credentials=JSON.parse(loggedInUser);
            props.fetchWatchList(user_credentials.token);
            axios.get('/backendapi/users',{
                headers: {
                  'Authorization': `bearer ${user_credentials.token}` 
              }})
            .then(()=>{
                props.userLogin(user_credentials);  
            })
            .catch(()=>{
                history.push('/login');
            });
            
        }
    },[history]);

    return <div></div>;
}
const mapDispatchToProps=(dispatch)=>{
    return{
      userLogin: (userCred)=>dispatch(user_login_success(userCred)),
      fetchWatchList: (token)=>dispatch(fetch_fm(token)),
    }
 }
 const mapStateToProps=(state)=>{
     return {
         user: state.auth.user
     }
 }
 export default connect(mapStateToProps,mapDispatchToProps)(LogC);