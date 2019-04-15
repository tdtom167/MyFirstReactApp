import React from 'react';


//state SubObject of todoApp state called reducer which takes state and a action and
// according to the action it gets returns new state specifically sets the filter and depending
// on that we decide which actions we want to show
export const visibilityFilter = (state:string = 'SHOW_ALL', action:{type:string, filter:string}) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}
