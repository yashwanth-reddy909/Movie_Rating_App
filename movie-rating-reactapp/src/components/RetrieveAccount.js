import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { Link } from 'react-router-dom';
function RetrieveAccount() {
    const [mailid,setMailid]=useState(false);
    const [resu,setResu]=useState(false);
    const [pin,setPin]=useState('');
    const [username,setUsername]=useState('');
    const [all,setAll]=useState({email: '' , password: '',confirmpassword: '',otp: ''});



    useEffect(()=>{
        if(mailid){
            axios.post('/backendapi/users/getusername',{emailid: all.email})
            .then((res)=>{
                setUsername(res.data.username);
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err);
            });

        }
    },[mailid])

    const sendotp=()=>{
        axios.post('/backendapi/retreivepassword',{emailid: all.email})
        .then(res=>{
            console.log('OTP sent to the registred Email');
            setMailid(true);
        })
        .catch(err=>{
            console.log(err);
            document.getElementById('emailche').innerHTML='Sorry <i class="bi bi-emoji-frown"></i> your email is not in our database <a href="/signup">Create an account</a>'
        });
    }
    const handleChange=(e)=>{
        if(!mailid){
            document.getElementById('emailche').innerHTML='';
        }
        else{
            document.getElementById('otpche').innerHTML=''
        }
        setAll(prev=>{ return {...prev,[e.target.name]: e.target.value} });
    
    }

    const resetPass=()=>{
        if(all.password!==all.confirmpassword ){
            document.getElementById('otpche').innerHTML='Passwords mismatched';
            return ;
        }
        if(all.password.length<=4){
            document.getElementById('otpche').innerHTML='Password min length is 5';
            return;
        }
        axios.post('/backendapi/retreivepassword/q',all)
        .then(res=>{
            setResu(true);
            document.getElementById('otpche').innerHTML='Successfully Changed ';
        })
        .catch(err=>{
            document.getElementById('otpche').innerHTML='OTP not matched'
        });
    }
    const setotp=(da)=>{
        document.getElementById('otpche').innerHTML=''
        setPin(da);
        setAll(prev=>({...prev,otp: da}))
    }
    return <div>{!mailid ?  (
    <div className='emaildiv'>
        <h2>Forgot Password? </h2>
        <div className='downemail'>
            <h3>Enter the email address associated with your Account</h3>
            <div className='bluremail'>We will mail you a 4 digit otp for confirmation</div>
            <div className='emailinput'><div id='emailinputdiv'><input type='text' name='email' value={all.email} onChange={handleChange}/><label htmlFor='text' className={all.email!=='' ? 'Active' : "" }>Enter the Email address</label></div><span className='sendotpbt' onClick={sendotp}>Confirm</span></div>
            <div id='emailche'></div>
        </div>
    </div>) :  
        (<div><div id='otpdiv'>
        <h2>Hi {username}, Enter the OTP four digit pin</h2>
        <OtpInput
            value={pin}
            onChange={setotp}
            numInputs={4}
            inputStyle={'inputotp'}
            focusStyle={'focusotp'}
            separator={<span></span>}
            containerStyle={'contotp'}
      />
      </div>
      <div className='fudiv1'>
        <div className='fudiv'><div id='changepassworddiv'><input type="text" name='password' value={all.password} onChange={(e) => handleChange(e)}/><label htmlFor="text" className={all.password!=='' ? 'Active' : "" }>New Password</label></div></div>
        <div className='fudiv'><div id='changepassworddiv1'><input type="text" name='confirmpassword' value={all.confirmpassword} onChange={(e) => handleChange(e)}/><label htmlFor="text" className={all.confirmpassword!=='' ? 'Active' : "" }>Re-enter Password</label></div></div>
      </div>
      <div className='resetbt'>
      <div onClick={resetPass} className='bt2'>Reset Password</div>
      <div id='otpche'></div><span>{resu ? <Link to='/login'>Login</Link>: ''}</span>
      </div>
      </div>)}
    </div>;
}

export default RetrieveAccount;
