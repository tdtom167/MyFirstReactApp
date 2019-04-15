import React from 'react';


import {combineReducers} from 'redux';
import { todos } from './todos' 
import  { visibilityFilter }  from './visibilityFilter' 
//main Reducer created using Redux app
export const todoApp = combineReducers({
    todos,
    visibilityFilter
});
