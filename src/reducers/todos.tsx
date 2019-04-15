import React from 'react';


import { ITodoProps, IActionTodoType } from '../types'
import { todo } from '../reducers/todo'
//state SubObject of todoApp state called reducer which takes state and a action and
// according to the action it gets returns new state specifically add
export const todos = (state:ITodoProps[] = [], action :IActionTodoType):ITodoProps[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo({},action)]; //TODO Why can't I call it just todo(action)
        case 'TOGGLE_TODO':
            return state.map(t =>todo (t,action));
        default:
            return state;
    }
};