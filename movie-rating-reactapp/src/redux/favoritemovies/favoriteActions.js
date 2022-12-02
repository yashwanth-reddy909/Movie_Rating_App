import axios from "axios";
import {  FAVORITE_MOVIES_FETCH_SUCCESS,FAVORITE_MOVIES_FETCH_FAIL,POST_FAVORITE_MOVIE_SUCCESS,POST_FAVORITE_MOVIE_FAIL,DELETE_FAVORITE_MOVIE_SUCCESS,DELETE_FAVORITE_MOVIE_FAIL, POST_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE} from "./favoriteTypes";

export const fetch_fm_suc=(favMovies)=>{
    return{
        type: FAVORITE_MOVIES_FETCH_SUCCESS,
        payload: favMovies
    }
}

export const fetch_fm_fai=()=>{
    return{
        type: FAVORITE_MOVIES_FETCH_FAIL,
        payload: 'Favorite Movies Fetch failed'
    }
}

export const fetch_fm=(token)=>{
    return dispatch=>{
        axios.get('/backendapi/towatch',{
          headers: {
            'Authorization': `bearer ${token}` 
        }})
        .then(res=>{
            dispatch(fetch_fm_suc(res.data));
        })
        .catch(err=>{
            dispatch(fetch_fm_fai);
            console.log(err);
        });
    }
}
export const post_fm_fai=()=>{
    return{
        type: POST_FAVORITE_MOVIE_FAIL,
        payload: 'favorite movie posting error'
    }
}
export const post_fm_su=(favMovies,movieid)=>{
    return{
        type: POST_FAVORITE_MOVIE_SUCCESS,
        payload: [favMovies,movieid]
    }
}
export const post_fm=(token,movieId)=>{
    return dispatch=>{
        dispatch({type:POST_FAVORITE_MOVIE,payload: movieId});
        axios.post(`/backendapi/towatch/${movieId}`,null,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(resp=>{
            dispatch(post_fm_su(resp.data,movieId));
        })
        .catch(err=>{
            console.log(err);
            dispatch(post_fm_fai());
        });
    }
}

export const delete_fm_fai=()=>{
    return{
        type: DELETE_FAVORITE_MOVIE_FAIL,
        payload: 'favorite movie deleteing error'
    }
}
export const delete_fm_su=(favMovies,movieid)=>{
    return{
        type: DELETE_FAVORITE_MOVIE_SUCCESS,
        payload: [favMovies,movieid]
    }
}
export const delete_fm=(token,movieId)=>{
    return dispatch=>{
        dispatch({type: DELETE_FAVORITE_MOVIE,payload: movieId});
        axios.delete(`/backendapi/towatch/${movieId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res=>{
            dispatch(delete_fm_su(res.data,movieId))
        })
        .catch(err=>{
            console.log(err);
            dispatch(delete_fm_fai())
        })
    }
}