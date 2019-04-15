import React from 'react';


import {ITodoProps, IActionTodoType} from '../types'
// state SubObject of todos resposible for creating new todos again reducer
export const todo = (state:ITodoProps|any = {}, action:IActionTodoType)=> {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
            return state;
        }
            return {...state, completed: !state.completed};
        default:
            return state;
    }
}
