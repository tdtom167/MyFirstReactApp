import React from 'react';


import {ITodoProps} from '../types'
import {Todo} from './Todo'

// dumper responsible for dumping all todos
//TODO todos are taken from state object and onTodoClick is passed from mapDispatchToTodoListProps??
export const TodoList = ({todos, onTodoClick}:{
    todos:ITodoProps[], onTodoClick:Function}) => (
        <ul>
            {todos.map (todo =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={(() => onTodoClick(todo.id))}
                />)}
        </ul>
);


