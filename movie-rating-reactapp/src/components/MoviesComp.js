import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { fetch_fm,delete_fm, post_fm } from '../redux/favoritemovies/favoriteActions';
import CommentComp from './CommentComp';
import { useHistory } from 'react-router';
import bodyParser from 'body-parser';

export const intialState ={
    movies: {},
    loading: true
}
function MoviesComp(props) {
    const [movies, setMovies] = useState([]);
    const [allrating,setAllrating]=useState({});
    const history=useHistory();
    useEffect(()=>{
        const m=async(e)=>{
        document.body.style.overflowY='scroll'
        axios.get('/backendapi/movies')
            .then(resp=>{
                setMovies(resp.data);
                console.log(resp.data);
            })
            .catch(err=>{
                console.log(err);
                console.log('Movies fetch error');
            });
        }
        m();
        return ()=>{
            document.body.style.overflowY='auto'
        }
    }
    ,[]);
    useEffect(()=>{
        
        if(props.isLogged){
            props.fetchWatchList(props.user.token);
        }
    },[props.user.token]);

    const ratingCheck=(value,id)=>{
        setAllrating(prev=>(
            {...prev,[id]: value}
        ));
    }

    const postRating=(movieId)=>{
        if(!props.isLogged){
            history.push('/login');
            return;
        }
        if(!allrating[movieId]){
            console.log('Rating value cannot be null');
        }
        else{
            if(props.isLogged){
                axios.get(`/backendapi/movies/${movieId}`)
                .then(res=>{
                    const movie=res.data;
                    for(let i=0;i<movie.comments.length;i++){
                        if(props.user.userid===movie.comments[i].author){
                            axios.put(`/backendapi/movies/${movieId}/comments/${movie.comments[i]._id}`,{
                                rating: allrating[movieId]
                            },{
                                headers: {
                                    'Authorization': `bearer ${props.user.token}`
                                }
                            })
                            .then(resp=>{
                                axios.get('/backendapi/movies')
                                .then(resp2=>{
                                    setMovies(resp2.data);
                                })
                                .catch(err=>{
                                    console.log(err);
                                    console.log('Movies fetch error');
                                });
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                            return null;
                        }
                    }
                    axios.post(`/backendapi/movies/${movieId}/comments`,{ rating: allrating[movieId]},{
                        headers: {
                            'Authorization': `bearer ${props.user.token}`
                        }
                    })
                    .then(resp=>{
                        axios.get('/backendapi/movies')
                        .then(resp3=>{
                            setMovies(resp3.data);
                        })
                        .catch(err=>{
                            console.log(err);
                            console.log('Movies fetch error');
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                })
                .catch(err=>{
                    console.log(err);
                });
            }
            else{
            }
        }
    }

    const avgRating=(comments)=>{
        var len=comments.length;
        var j=0;
        for(let i=0;i<len;i++){
            j=j+comments[i].rating;
        }
        return (j/len).toFixed(1);
    }

    const isCommented=(comments)=>{
        if(!props.user.userid){
            return 0;
        }
        var len=comments.length;
        for(let i=0;i<len;i++){
            if(props.user.userid===comments[i].author){
                return comments[i].rating;
            }
        }
        return 0;
    }

    const checkFav=(id)=>{
        for(let i=0;i<props.watchList.length;i++){
            if(props.watchList[i]._id===id){
                return true
            }
        }
        return false;
    }

    const postmovietowatchList=(id)=>{
        props.postFav(props.user.token,id);
    }
    const deletefavmovie=(id)=>{
        props.deleteFav(props.user.token,id);
    }

    const sortmovies=(rat,fli)=>{
        if(!rat){
            rat=0
        }
        const l=[]
        for(let i=0;i<movies.length;i++){
            if(avgRating(movies[i].comments)>=rat){
                l.push(movies[i])
            }
        }
        if(!fli){
            return l;
        }
        if(fli.length===0){
            return l;
        }
        const l1=[]
        for (let i=0;i<l.length;i++){
            for(let j=0;j<l[i].genre.length;j++){
                if(fli.indexOf(l[i].genre[j])!==-1){
                    l1.push(l[i])
                    break
                }
            }
        }
        return l1;
    }

    return (
        <div id='allmovies'>

            {(props.rating!==0 && sortmovies(props.rating).length===0) && <div id='sorthandlerdiv1'>Loading...</div> }
            { sortmovies(props.rating,props.fliters).map(each=>(<div key={each._id} className='eachmovie'>
                <img src={each.imageurl} alt={each.name+ 'image'} className='movieimg imagecenter'/>
                <div className='moviedetails'>
                <div>
                    <div className='movietitle'>{each.name} <span>{props.isLogged ?  props.isloading[each._id] ? (<span className='loade'>Working on it...</span>): (<span>{checkFav(each._id) ? <span onClick={()=>deletefavmovie(each._id) } className="tooltip"><i className="bi bi-dash-circle ko plusminussign"></i><span className="tooltiptext">Remove from Watchlist</span></span>: <span onClick={()=>postmovietowatchList(each._id)} className="tooltip" id={each._id+'addfav'}><i className="bi bi-plus-circle ko plusminussign"></i><span className="tooltiptext">Add to your Watchlist</span></span>}</span>) : ''}</span></div>
                    
                    
                </div>
                <div className='avgrating'><span><span className='avg'>{avgRating(each.comments)}</span><span style={{color: 'rgb(176, 197, 192)'}}>/5</span> <span className='noofratings'>({each.comments.length} ratings)</span></span></div>
                <div>{each.genre.map((eachgenre,i)=>(<span className='eachgenre' key={i}>{eachgenre}</span>))}</div>
                <div className='cast'>Cast {each.cast.map((eachcast,i)=><span key={eachcast+i} className='eachcast'>{eachcast}</span>)}</div>
                <CommentComp MovieID={each._id} ratingCheck={ratingCheck} postRating= {postRating} lastrated={isCommented(each.comments)}/>
                </div>
            </div>))}
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        watchList: state.fav.FavMovies,
        user: state.auth.user,
        isLogged: state.auth.isLogged,
        isloading: state.fav.isloading
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        fetchWatchList: (token)=>dispatch(fetch_fm(token)),
        deleteFav : (token,movieId)=>dispatch(delete_fm(token,movieId)),
        postFav: (token,movieId)=>dispatch(post_fm(token,movieId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MoviesComp);
