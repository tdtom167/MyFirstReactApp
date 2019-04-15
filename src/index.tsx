import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from 'react-redux'
import React from 'react';
import './App.css';
import {createStore, combineReducers} from 'redux';
import ReactDOM from 'react-dom'



interface IActionTodoType{
    id:number,
    text:string,
    type:string
}


interface ITodoProps {
    id: number;
    text: string;
    completed: boolean;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++REDUCERS+++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++


//state SubObject of todoApp state called reducer which takes state and a action and
// according to the action it gets returns new state specifically add
const todos = (state:ITodoProps[] = [], action :IActionTodoType):ITodoProps[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo({},action)]; //TODO Why can't I call it just todo(action)
        case 'TOGGLE_TODO':
            return state.map(t =>todo (t,action));
        default:
            return state;
    }
};

// state SubObject of todos resposible for creating new todos again reducer
const todo = (state:ITodoProps|any = {}, action:IActionTodoType)=> {
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

//state SubObject of todoApp state called reducer which takes state and a action and
// according to the action it gets returns new state specifically sets the filter and depending
// on that we decide which actions we want to show
const visibilityFilter = (state:string = 'SHOW_ALL', action:{type:string, filter:string}) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}


//main Reducer created using Redux app
const todoApp = combineReducers({
    todos,
    visibilityFilter
});


// OTHERS

//returns new action object with type SET_VISIBILITY_FILTER and filter according to an argument
// with the filter set this is than passed to the todoApp reducer and the state of the object is changed according to it
// called from mapDispatchToLinkProps
const setVisibilityFilter = (filter:any) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }

}


//Dumper responsible for one Link
const Link = ({active, children, onClick}:
                  {active:boolean, children:String, onClick:any}) => {
    if (active){
        return <span> {children} </span>
    }

    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick();
           }}>
             {children}
        </a>
    )

}


//TODO not sure how there 2 work and how they pass the params to the Link component
const mapStateToLinkProps = (state:{visibilityFilter:string}, ownprops:{filter:string}) => {
    return {
        active: ownprops.filter == state.visibilityFilter
    }
};


const mapDispatchToLinkProps = (dispatch:Function, ownprops:{filter:string}) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownprops.filter))
        }
    }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);


const Footer = () => (
    <p>
        Show: {' '}
        <FilterLink filter='SHOW_ALL'> All </FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'> Active </FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'> Complete </FilterLink>
    </p>);

// var responsible for keeping track of the id of the todos
// TODO could be made somehow into the state object wouldn't it be better approach ?
let nextTodoId:number = 0;

//function responsible for creating a new todos called from AddTodo
const addTodo = (text:string) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

// Presentational object/dumper responsible for showing how the addToho button and input are shown
// and takes input from the input field which is then added using dispatch
// param dispatch object taken from createStore resposinble for dispatching the actions
let AddTodo = ({ dispatch }:{dispatch:Function}|any) => {

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

//dumper responsible for dumping single todos and chosing its style and how it will behave
const Todo = ({onClick, text, completed}:{onClick:any, text:string, completed:boolean}) =>
    (<li onClick={onClick}
         style={{
             textDecoration:
                 completed ? 'line-through' : 'none'}}>
    {text}
</li>);




// dumper responsible for dumping all todos
//TODO todos are taken from state object and onTodoClick is passed from mapDispatchToTodoListProps??
const TodoList = ({todos, onTodoClick}:{
    todos:ITodoProps[], onTodoClick:Function}) => (
        <ul>
            {todos.map (todo =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={(() => onTodoClick(todo.id))}
                />)}
        </ul>
);

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


const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);


/*
    Main Class of our aplication has render() function which is called implicitly and calls the 3 main compoments
    State is passed from parent provider and is avaliable in every component
    state argument only because  console log else could be left out
 */
const TodoApp = (state:ITodoProps|any) => {
    console.log(state) // TODO Why it is not called everytime ?
    return <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
</div>}



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
