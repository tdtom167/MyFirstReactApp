import React from 'react';

import { connect } from 'react-redux'
import { ITodoProps } from '../types'
import { TodoList } from './TodoList'

//function responsible for mapping the state to the props
// TODO these props are then avaliable as argument in whole TODOList right ?
const mapStateToTodoListProps = (state:{todos:ITodoProps[], visibilityFilter:string}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter)
    }
};

//function determining what happend on click event with dispatching the action and changing the state TODO right?
// TODO Where are the props mapped back to state
const mapDispatchToTodoListProps = (dispatch : Function) => {
    return {
        onTodoClick:
            (id:number) => {
                dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })
            }
    }
};


export const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

//function returning array of objects resposible for filtering which todos show
const getVisibleTodos = (todos:ITodoProps[], filter:string):ITodoProps[] => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter((todo:ITodoProps) => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter((todo:ITodoProps) => todo.completed);
        default:
            return todos
    }
};
