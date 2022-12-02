import React, { useState,useEffect } from "react";
import validator from 'validator';
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
const SignUp=()=>{
    const [inUser,setInUser]=useState({
        firstname: '',
        username: '',
        emailid: '',
        lastname: '',
        password: '',
        confirmpassword: ''
    });
    const [allUsers,setAllUsers]=useState([]);
    const [allemails,setEmails]=useState([]);
    const [sigResult, setSigResult]=useState('');

    useEffect(() => {
        axios.get('/backendapi/users/usernames')
        .then(res=>{
            setAllUsers(res.data);
        })
        .catch(err=>{
            console.log('Fetch failed of getting all usernames');
        });
        axios.get('/backendapi/users/emails')
        .then(res=>{
            setEmails(res.data);
        })
        .catch(err=>{
            console.log(err)
        });
    }, [sigResult]);

    const handleChange=(e)=>{
        document.getElementById('errorhandle1').innerHTML='';
        setInUser(prev=>({
            ...prev,
        [e.target.name]: e.target.value 
        }));
    }

    const handleSubmit=()=>{
        document.getElementById('errorhandle1').innerHTML='';
        setSigResult('');
        if(inUser.password!=='' && inUser.username!=='' && inUser.confirmpassword!=='' && inUser.emailid){
                if(inUser.confirmpassword!==inUser.password){
                  
                    document.getElementById('errorhandle1').innerHTML='Passwords not matching !'
                }
                else if(!(validator.isEmail(inUser.emailid))){
                    document.getElementById('errorhandle1').innerHTML='Enter an valid email id'
                }
                else if(inUser.confirmpassword.length<=4){
                    document.getElementById('errorhandle1').innerHTML='Password too weak...';
                }
                else if(allemails.indexOf(inUser.emailid)!==-1){
                    document.getElementById('errorhandle1').innerHTML='Email already exists';
                }
                else{
                    console.log(inUser);
                    axios.post('/backendapi/users/signup',{username: inUser.username,
                                                   password: inUser.password,
                                                   firstname: inUser.firstname,
                                                   emailid: inUser.emailid,
                                                   lastname: inUser.lastname})
                    .then(resp =>{
                        setSigResult('Successfully Registered');
                        localStorage.setItem('username', inUser.username);
                    })
                    .catch(err=>{
                       console.log(err); 
                       document.getElementById('errorhandle1').innerHTML='Email Exists!';
                    });
                    
                }
            }
            else{
                document.getElementById('errorhandle1').innerHTML='Required fileds cannot be empty';
                return;
            }
        
    }
    const usernameCheck=(e)=>{
        const k=e.target.value;
        if(k===''){
            document.getElementById('usernameValid').innerHTML='';
            return;
        }
        for(let i=0;i<allUsers.length;i++){
            if(k===allUsers[i]){
                document.getElementById('usernameValid').innerHTML='username is taken';
                return;
            }
        }
        document.getElementById('usernameValid').innerHTML='username is avaliable'    
    }

    return(
        <div className='mainsignup'>
            <div className='ac1'>
            <h1  className='createacc'>Create Account</h1>
            <div id='si1'><input type='text' name='firstname' value={inUser.firstname} onChange={handleChange} /><label className={inUser.firstname!=='' ? 'Active' : "" }>First Name</label></div>
            <div id='si2'><input type='text' name='lastname'  value={inUser.lastname} onChange={handleChange}/><label className={inUser.lastname!=='' ? 'Active' : "" }>Last Name</label></div>
            <div id='si3'><input type='text' name='emailid'  value={inUser.emailid} onChange={e=>{handleChange(e)}}/><label className={inUser.emailid!=='' ? 'Active' : "" }>E-mail *</label></div>
            <div id='si4'><input type='text' name='username'  value={inUser.username} onChange={e=>{handleChange(e);usernameCheck(e)}}/><label className={inUser.username!=='' ? 'Active' : "" }>Username *</label></div>
            <div id='usernameValid' ></div>
            <div id='si5'><input type='password' name='password'  value={inUser.password} onChange={handleChange} /><label className={inUser.password!=='' ? 'Active' : "" }>Password *</label></div>
            <div id='si6'><input type='password' name='confirmpassword'   value={inUser.confirmpassword} onChange={handleChange} /><label className={inUser.confirmpassword!=='' ? 'Active' : "" }>Re-enter Password *</label></div>
            <div style={{textAlign: 'center'}}><div className='signupdiv signup' onClick={handleSubmit}>Sign Up</div></div>
            <div id='errorhandle1' className='signupdiv1 '></div>
            {sigResult!=='' && <div className='signupdiv1 '>{sigResult} <Link to='/login'>go to Login</Link></div>}
            </div>
            <div className='ac2'><h1>Join our Community</h1>
                <div className='luxeries'><i class="bi bi-bookmark-check-fill tickicon"></i><span>Get full access to review the movies</span></div>
                <div className='luxeries'><i class="bi bi-bookmark-check-fill tickicon"></i><span>Add the movies you want to watch later to your wishlists</span></div>
                <div className='luxeries'><i class="bi bi-bookmark-check-fill tickicon"></i><span>Sort the best movies to watch</span></div>
            </div>
        
        </div>
    )
}
export default connect()(SignUp);