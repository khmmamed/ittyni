import React from "react";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers } from "redux";

const initialState = {
  fetching: "",
  fetched: true,
  tests: []
}

//Reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TESTS_START":
      return { ...state, fetching: "fa fa-spinner fa-spin" };
      break;
    case "RECIEVE_TESTS":
      return {
        ...state,
        fetching: "receiving data ...",
        fetched: true,
        tests: action.payload
      };
      break;
    case "FETCH_TESTS_ERROR":
      return {  ...state, fetching: "", error: action.payload.message };
      break;
  }
  return state;
};

export const Header = (state={
  user : {
    status : "fa fa-lock",
    username : "this is username",
    message : "message"
  }
}, action)=>{
  switch (action.type) {

    case "FETCH_USER_START" : 
      return {...state, user : {status : "fa fa-spinner fa-spin"}};
      break;
    case "LOGGIN_USER" : 
      return {...state, status : "fa fa-user"};
      break;
  }
  return state
}
//function dispatched
export const Here = ()=> dispatch => { 
  dispatch({ type: "FETCH_TESTS_START" });
    axios
      .get("http://localhost:8081/api/eLab/tests/fr")
      .then(respond => {
        dispatch({ type: "RECIEVE_TESTS", payload: respond.data });
      })
      .catch(err => dispatch({ type: "FETCH_TESTS_ERROR", payload: err }));
}

export const getUser=()=> dispatch =>{
  dispatch({type : "FETCH_USER_START"});
}



///Export Reducers 
export const middleware = applyMiddleware(thunk, logger)

export const rootReducer = combineReducers({
  reducer,
  Header
})