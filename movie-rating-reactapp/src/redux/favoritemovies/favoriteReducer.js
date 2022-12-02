
import {  POST_FAVORITE_MOVIE,DELETE_FAVORITE_MOVIE,FAVORITE_MOVIES_FETCH_SUCCESS,FAVORITE_MOVIES_FETCH_FAIL,POST_FAVORITE_MOVIE_SUCCESS,POST_FAVORITE_MOVIE_FAIL,DELETE_FAVORITE_MOVIE_FAIL,DELETE_FAVORITE_MOVIE_SUCCESS} from "./favoriteTypes";

const intialState={
    FavMovies: [],
    err: '',
    isloading: {}
}

const favReducer=(state=intialState,action)=>{
    switch (action.type) {
        case  FAVORITE_MOVIES_FETCH_SUCCESS :
        return{
            ...intialState,
            FavMovies: action.payload.favoritemovies
        }
        case POST_FAVORITE_MOVIE:
            return{
                ...state,
                isloading: {...state.isloading,[action.payload]: true}
            }
        case FAVORITE_MOVIES_FETCH_FAIL: return{
            ...state,
            err: action.payload
        }
        case POST_FAVORITE_MOVIE_SUCCESS: return{
            ...intialState,
            isloading: {...state.isloading,[action.payload[1]]: false},
            FavMovies: action.payload[0].favoritemovies
        }
        case DELETE_FAVORITE_MOVIE: return{
            ...state,
            isloading: {...state.isloading,[action.payload]: true}
        }
        case POST_FAVORITE_MOVIE_FAIL: return{
            ...state,
            err: action.payload
        }
        case DELETE_FAVORITE_MOVIE_SUCCESS: return{
            ...intialState,
            isloading: {...state.isloading,[action.payload[1]]: false},
            FavMovies: action.payload[0].favoritemovies
        }
        case DELETE_FAVORITE_MOVIE_FAIL: return{
            ...state,
            err: action.payload
        }
        case 'REFRESH_FAVORITES': return intialState;
        default:
            return state;
    }
};
export default favReducer ;