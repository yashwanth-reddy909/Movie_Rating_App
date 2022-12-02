import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginComp from './components/loginComp';
import Signup from './components/Signup';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LogC from './components/LogCheck';
import HeaderComp from './components/HeaderComp';
import MoviesComp from './components/MoviesComp';
import WatchListComp from './components/WatchListComp';
import AccountSettings from './components/AccountSettings';
import Aboutus from './components/Aboutus';
import RetrieveAccount from './components/RetrieveAccount';
import { useState } from 'react';
function App() {
  const [rat,setRat]=useState({minrate: 0,action: false,drama: false,comedy: false,['sci-fi']: false,horror: false,adventure: false,comics: false,thriller: false,romance: false,fantasy: false});
  
  const handleSort=(e)=>{
    const r=e.target.value;
    setRat(prev=>({...prev,minrate: r}));
  }

  const handlegenre=(e)=>{
    const g=e.target.id;
    const tre=rat[g] ? false : true
    setRat(prev=>({...prev,[g]: tre}))
  }

  const allgenre=(ratfun)=>{
    const k=Object.keys(ratfun)
    const w=[]
    for(let i=1;i<k.length;i++){
      if(ratfun[k[i]]){
        w.push(k[i])
      }
    }
    return w
  }

  return (
    <BrowserRouter>
    <Provider store={store}>
      <div className="App">
      <HeaderComp handleSort={handleSort} rating={rat.minrate} handlegenre={handlegenre} fliters={rat}/>
      <Switch>
              <Route exact path='/' component={()=><MoviesComp rating={rat.minrate} fliters={allgenre(rat)} />}></Route>
              <Route exact path='/login' component={LoginComp}></Route>
              <Route exact path='/signup' component={()=><Signup />} ></Route>
              <Route exact path='/movies' component={()=><MoviesComp rating={rat.minrate} fliters={allgenre(rat)}/>}></Route>
              <Route exact path='/settings' component={AccountSettings}></Route>
              <Route exact path='/watchlist' component={WatchListComp}/>
              <Route exact path='/aboutus' component={Aboutus}/>
              <Route exact path='/otpgenerator' component={RetrieveAccount}/>
            </Switch>
  
      </div>
      <LogC />
    </Provider>
    </BrowserRouter>
  );
}
export default App;
