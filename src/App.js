import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Routes from './components/Routes';
import NavBar from "./components/NavBar";
import { getUser, addUserToken } from "./actionCreators/profile";
import { getTags } from './actionCreators/tagsAndUsers';
import { getRecipeTags } from './actionCreators/recipeList';
import { getRatings } from './actionCreators/userRatings';
import { getUsersCookbook } from './actionCreators/usersCookbook';

function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function checkIsLoggedIn() {

      if(token && username){
        console.log(username, {user : { token: token}})
        dispatch(getUser(username, {user : { token: token}}))
        dispatch(addUserToken(token));
      }
    }

    checkIsLoggedIn();
    dispatch(getRatings(username));
    dispatch(getUsersCookbook(username));
    dispatch(getTags());
    dispatch(getRecipeTags());


  }, [])

  return (
    <div className="App">
     <NavBar />
     <Routes />
    </div>
  );
}

export default App;
