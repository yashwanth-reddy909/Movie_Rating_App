
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { delete_fm, fetch_fm } from '../redux/favoritemovies/favoriteActions'

function WatchListComp(props) {
    useEffect(()=>{
        if(props.isLogged){
            props.fetchWatchList(props.user.token);
        }
    },[]);

    
    const avgRating=(comments)=>{
        var len=comments.length;
        var j=0;
        for(let i=0;i<len;i++){
            j=j+comments[i].rating;
        }
        return (j/len).toFixed(1);
    }

    const handleDelete=(id)=>{
        props.deleteFav(props.user.token,id);
    }
    return (
        <div id='watchlistdiv'>
            {props.isLogged ? ( props.watchList.length ===0 ? <div className='emptywatchlist'>Your watchilst is empty<i class="bi bi-emoji-frown-fill sad"></i></div> :
                props.watchList.map(each=>(<div key={each._id+'favor'} className='eachmovie eachfavormovie'>
                <img src={each.imageurl} alt={each.name+ 'image'} className='movieimg imagecenter'/>
                <div className='moviedetails'>
                <div>
                    <div className='movietitle'>{each.name} <span className='deletewat' onClick={()=>handleDelete(each._id)}><i class="bi bi-trash"></i></span></div>
                    
                    
                </div>
                <div className='avgrating'><span><span className='avg'>{avgRating(each.comments)}</span><span style={{color: 'rgb(176, 197, 192)'}}>/5</span> <span className='noofratings'>({each.comments.length} ratings)</span></span></div>
                <div>{each.genre.map((eachgenre,i)=>(<span className='eachgenre' key={i}>{eachgenre}</span>))}</div>
                <div className='cast'>Cast {each.cast.map((eachcast,i)=><span key={eachcast+i} className='eachcast'>{eachcast}</span>)}</div>
                </div></div>))
            ): <Link to='/login' >Login</Link> 
        }
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        watchList: state.fav.FavMovies,
        user: state.auth.user,
        isLogged: state.auth.isLogged
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        fetchWatchList: (token)=>dispatch(fetch_fm(token)),
        deleteFav : (token,movieId)=>dispatch(delete_fm(token,movieId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WatchListComp)
