import { connect } from 'react-redux'
import React from 'react';

// var responsible for keeping track of the id of the todos
// TODO could be made somehow into the state object wouldn't it be better approach ?
let nextTodoId:number = 0;


//function responsible for creating a new todos called from AddTodo
export const addTodo = (text:string) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

// Presentational object/dumper responsible for showing how the addToho button and input are shown
// and takes input from the input field which is then added using dispatch
// param dispatch object taken from createStore resposinble for dispatching the actions
export let AddTodo = ({ dispatch }:{dispatch:Function}|any) => {

    let input:HTMLInputElement|null;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                if (input !== null) {
                    dispatch(addTodo(input.value));
                    input.value=''
                }
            }}> Add Todo </button>
    </div>)
};
//@ts-ignore
AddTodo = connect()(AddTodo);
