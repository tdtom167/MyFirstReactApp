import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from 'react-redux'
import React from 'react';
import './App.css';
import {createStore} from 'redux';
import ReactDOM from 'react-dom'

import {TodoApp} from './components/TodoApp'
import {todoApp} from './reducers/todoApp'


// Main renderer Function which renders the whole application one time on start and creaetes the Provider app
//with state that monitors if something has changed and according to that rerenders
ReactDOM.render(
    //We use provider which causes that we are able to access the store object in all children elements
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();








//@ts-ignore

/*
class VisibleTodoList extends Component {
     unsubscribe:any;
     contextTypes:any

    componentDidMount(): void {
        //@ts-ignore
        const { store } = this.props.context;
        this.unsubscribe = store.subscribe( () => this.forceUpdate());
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    render() {
        const props = this.props
        //@ts-ignore
        const { store } = this.props.context;
        const state = store.getState()
        return (
            <TodoList
                todos={
                getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                )}
                onTodoClick={ (id:number) => store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })}
            />
    );
}
}
*/

/*

// @ts-ignore
function TodoList(todos, onTodoClick) {
    return  ( <ul>
        // @ts-ignore
        {todos.map (todo =>

            <Todo key={todo.id}
                  {...todo}
                  onClick={(() => onTodoClick(todo.id))}
            />)}
        )}
    </ul>
    )
}
*/

/*
class FilterLink extends Component {
    unsubscribe:any;
    props:any
    componentDidMount(){
        //@ts-ignore
        const { store } = this.props.context;

        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {

        const props:{
            children:Element,
            filter:string
         } = this.props;
        //@ts-ignore
        const { store } = this.props.context;
        const state = store.getState();
        return (
            <Link
                active={props.filter === state.visibilityFilter}
                onClick={() => store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter
                })}
            >
        {props.children}
        </Link>
        );
    }
}

// @ts-ignore
FilterLink.contextType = {
// @ts-ignore
    store: PropTypes.object
}
*/

/*
const todoApp = (state = {}, action:any) => {
    return {
        todos: todos(
            // @ts-ignore
            state.todos,
            action
        ),
        // @ts-ignore
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
} */

/*
export interface IDumperCounter3Props {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
}


const DumperCounter3 = (props: IDumperCounter3Props) => (
    (
        <div id="root">
            <h1>{props.value}</h1>
            <button onClick={props.onIncrement}>+</button>
            <button onClick={props.onDecrement}>-</button>
        </div>
    )
);

function counter_reducer(state = 0, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}



const render_counter = () =>{
    ReactDOM.render(
        <DumperCounter3
            // @ts-ignore
            value={store.getState()}
            onIncrement={() => store.dispatch({type: 'INCREMENT'})}
            onDecrement={() => store.dispatch({type: 'DECREMENT'})}/>,
        document.getElementById('root')
    );
};

*/
