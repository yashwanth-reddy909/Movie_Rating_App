import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import  favReducer  from "./favoritemovies/favoriteReducer";
const appReducer=combineReducers({
    auth: authReducer,
    fav: favReducer
});

export default appReducer;