import React from 'react';


import {ITodoProps} from '../types'
import {Footer} from './Footer'
import {VisibleTodoList} from './VisibleTodoList'
import {AddTodo} from './AddTodo'
/*
    Main Class of our aplication has render() function which is called implicitly and calls the 3 main compoments
    State is passed from parent provider and is avaliable in every component
    state argument only because  console log else could be left out
 */
export const TodoApp = (state:ITodoProps|any) => {
    console.log(state) // TODO Why it is not called everytime ?
    return <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>}