import React from 'react';

//Dumper responsible for one Link
export const Link = ({active, children, onClick}:
    {active:boolean, children:String, onClick:any}) => {
        if (active){
            return <span> {children} </span>
        }

return (
    <a href='#'
        onClick={e => {
            e.preventDefault();
            onClick();}}>
        {children}
    </a>)
}