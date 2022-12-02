import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { user_login } from "../redux/auth/authActions";
import { useHistory } from "react-router";
const Logincomp =(props)=>{

    var history =useHistory();
    const [userCred,setUserCred]=useState({
        username: '',
        password: ''
    });

    useEffect(()=>{
      if(props.isLogged){
          history.push('/movies');
      }
      else if(localStorage.getItem('username')!==''){
        setUserCred(prev=>({...prev,username: localStorage.getItem('username')}));
      }
      else{
        
        const loggedInUser = localStorage.getItem('user');
        const user_credentials=JSON.parse(loggedInUser);
        if(user_credentials){
            setUserCred(prev=>({...prev,username: user_credentials.userName}));
        }
      }  
    },[props.isLogged]);
    
    const handleChange=(event)=>{
        document.getElementById('usernameincorrect').innerHTML='';
        setUserCred(prevUserCred=>({...prevUserCred,
            [event.target.name]: event.target.value}));
    }
    
    const handleClick=()=>{
        
            props.Login(userCred)
            .then(()=>{
                console.log('User logg')
            })
            .catch((err)=>{
                console.log(err);
            });
       
       
        if(props.userDetails.success){
            document.getElementById('usernameincorrect').innerHTML='';
            history.push('/movies');
        }
        else{
            
            
        }
        
    }

    const forgetme=()=>{
        localStorage.removeItem('user');
        history.push('/movies');
    }
    return(
        <div id='logmain'>
                <div className='logineachdiv'><div className='userlo'><i class="bi bi-person-fill"></i></div><input type='text' name='username' onChange={handleChange} value={userCred.username}></input></div>
                <div className='logineachdiv'><div className='userlo'><i class="bi bi-key-fill"></i></div><input type='password' name='password' onChange={handleChange} value={userCred.password}/></div>
                <div className='logineachdiv '><div className='loginbutton' onClick={handleClick}>Log in</div></div>
                <div className='logineachdiv' id='usernameincorrect'></div>
                <div className='logineachdiv'>Don't have an acoount <Link to='/signup'>Create Account</Link><div style={{marginTop: 20}}><Link to='/otpgenerator'>Forgot Password/username? </Link></div><div style={{marginTop: 20,color: 'rgb(85, 26, 139)',cursor: 'pointer',textDecoration: 'underline'}} onClick={forgetme}>Continue without Logging in</div></div>
                
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        userDetails: state.auth.user,
        isLogged: state.auth.isLogged
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        Login: (user_cred)=>dispatch(user_login(user_cred))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Logincomp);


