import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
function AccountSettings(props) {
    const [us,setUs]=useState({});
    const [allUsers,setAllUsers]=useState([]);
    useEffect(()=>{
        axios.get('/backendapi/users/usernames')
        .then(res=>{
            setAllUsers(res.data);
        })
        .catch(err=>{
            console.log('Fetch failed of getting all usernames');
        });
        setUs(prev=>({...prev,username: props.user.userName,
                                lastname: props.user.userLastName,
                                firstname: props.user.userFirstName}));
    },[props.user]);

    const onchangefun=(e)=>{
        setUs(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const changedetails=()=>{
        if(!us.username){
            document.getElementById('accerr').innerHTML='username Field required';
            return;
        }
        if(props.user.userName!==us.username){
            if(allUsers.indexOf(us.username)!==-1){
                document.getElementById('accerr').innerHTML='Username exists';
                return;
            }
        }
        axios.put('/backendapi/users/accountdetails',us,{
            headers: {
                'Authorization': `Bearer ${props.user.token}` 
            }
        })
        .then((res)=>{
            document.getElementById('accerr').innerHTML='Successfully Saved';
            props.Changeaccountdetails(us);
        })
        .catch(err=>{
            console.log(err);
            document.getElementById('accerr').innerHTML=err.message;
        });
    }

    const usernameCheck=(e)=>{
        const k=e.target.value;
    
        if(k===props.user.userName){
            document.getElementById('accountk').innerHTML='';
            return;
        }
        for(let i=0;i<allUsers.length;i++){
            if(k===allUsers[i]){
                document.getElementById('accountk').innerHTML='username is taken';
                return;
            }
        }
        document.getElementById('accountk').innerHTML='username is avaliable'    
    }

    return (
        <div className='settingsdiv'>
            <div className='eachsettingdiv'><div className='settingstitle'>Firstname: </div><input id='changefirstname' type='text' name='firstname' onChange={onchangefun} value={us.firstname}/></div>
            <div className='eachsettingdiv'><div className='settingstitle'>Lastname: </div><input id='changelastname' type='text' name='lastname' onChange={onchangefun} value={us.lastname}/></div>
            <div className='eachsettingdiv'><div className='settingstitle'>Username: </div><input type='text' name='username' onChange={(e)=>{onchangefun(e);usernameCheck(e)}} value={us.username} /></div>
            <div className='eachsettingdiv' id='accountk'></div>
            <div className='eachsettingdiv changedet' onClick={changedetails} >Save Details</div> 
            <div className='eachsettingdiv' id='accerr'></div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
            isLogged: state.auth.isLogged,
            user: state.auth.user
    }

}
const mapDispatchToProps=(dispatch)=>{
    return {
    Changeaccountdetails: (newAccountdetails)=>dispatch({type: 'CHANGE_ACCOUNTDETAILS',payload: newAccountdetails})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountSettings);
