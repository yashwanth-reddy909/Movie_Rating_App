import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import { user_logout } from '../redux/auth/authActions';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import Checkbox from './Checkbox';
function HeaderComp(props) {
    const history=useHistory();
    const location=useLocation();
    const [endpoint,setEndpoint]=useState(location.pathname)
    useEffect(()=>{
        setEndpoint(location.pathname)
    },[location])

    const popfliters=()=>{
        if(document.getElementById('ff').style.opacity==='1'){
            document.getElementById("ff").style.opacity='0';
            document.getElementById("ff").style.height='0';
            document.getElementById('fliterarr').style.transform='rotateX(0deg)';
        }
        else{
            document.getElementById("ff").style.height='auto';
            document.getElementById("ff").style.opacity='1';
            document.getElementById('fliterarr').style.transform='rotateX(180deg)';
        }
    }

    return (
        <div id='headpart'>
            <div className='logoname'>PIXELS<div className='logofooter'>movie rating app</div></div>
            <div className='jo'>
                {(endpoint==='/movies' || endpoint==='/') && <div className='headerbutton dropdown2'><span onClick={()=>{popfliters()}}>Fliters<div id='fliterarr'><i className="bi bi-funnel"></i></div></span><div className='dropdowncontent2' id='ff'>
                <div className='exitfli'><h3>Min Rating </h3><input type="range" id="ratingrange" name="volume" value={props.rating} min="0" max="4.5" step='0.5' onChange={(e)=>{props.handleSort(e)}} /><span className='ratingvis'>{props.rating}</span><i onClick={()=>{popfliters()}}  className="bi bi-x exitfliters"></i></div>
                <div className='er'>
                    <div className='genrebox'><label><Checkbox id='action' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.action}/><span style={{ marginLeft: 8 }}>Action</span></label></div>
                    <div className='genrebox'><label><Checkbox id='drama' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.drama}/><span style={{ marginLeft: 8 }}>Drama</span></label></div>
                    <div className='genrebox'><label><Checkbox id='comedy' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.comedy}/><span style={{ marginLeft: 8 }}>Comedy</span></label></div>
                    <div className='genrebox'><label><Checkbox id='sci-fi' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters['sci-fi']}/><span style={{ marginLeft: 8 }}>Sci-fi</span></label></div>
                    <div className='genrebox'><label><Checkbox id='romance' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.romance}/><span style={{ marginLeft: 8 }}>Romance</span></label></div>
                    <div className='genrebox'><label><Checkbox id='adventure' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.adventure}/><span style={{ marginLeft: 8 }}>Adventure</span></label></div>
                    <div className='genrebox'><label><Checkbox id='horror' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.horror}/><span style={{ marginLeft: 8 }}>Horror</span></label></div>
                    <div className='genrebox'><label><Checkbox id='comics' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.comics}/><span style={{ marginLeft: 8 }}>Comics</span></label></div>
                    <div className='genrebox'><label><Checkbox id='thriller' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.thriller}/><span style={{ marginLeft: 8 }}>Thriller</span></label></div>
                    <div className='genrebox'><label><Checkbox id='fantasy' onChange={(e)=>{props.handlegenre(e)}} checked={props.fliters.fantasy}/><span style={{ marginLeft: 8 }}>Fantasy</span></label></div>
                
                </div>
                <div className='sorthandler'></div></div></div>}

            <div className='headerbutton watchlistbu'>{props.isLogged ? <Link  className='linkstyle linkstyleheader' to='/watchlist'>Watchlist</Link> : <Link  className='linkstyle linkstyleheader' to='/aboutus'>About us</Link>}</div>
            {props.isLogged ? 
                <div className='headerbutton dropdown'><i class="bi bi-person-fill"></i>
                <span className='usernameinheader'>{props.user.userName}<div className='downarrow'><i class="bi bi-chevron-down arr"></i></div></span> 
                    <div className='dropdown-content'>
                        <div className='dropdowndiv' onClick={()=>history.push('/movies')}>Home</div>
                        <div className='dropdowndiv' onClick={()=>history.push('/watchlist')}>Your watchlist</div>
                        <div className='dropdowndiv' onClick={()=>history.push('/settings')}>Account Settings</div>
                        <div className='dropdowndiv' onClick={()=>history.push('/aboutus')}>About us</div>
                        <div className='dropdowndiv' onClick={props.LogOut}> Log out</div>
                    </div>
                </div>
                : 
                <div className='headerbutton'><Link to='/login' className='linkstyle linkstyleheader'>Login</Link> </div> 
            }
            </div>
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
    LogOut: ()=>[dispatch(user_logout()),dispatch({type: 'REFRESH_FAVORITES'})]
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComp);
