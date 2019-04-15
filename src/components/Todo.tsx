import React from 'react';

//dumper responsible for dumping single todos and chosing its style and how it will behave
export const Todo = ({onClick, text, completed}:{onClick:any, text:string, completed:boolean}) =>
    (<li onClick={onClick}
         style={{
             textDecoration:
                 completed ? 'line-through' : 'none'}}>
    {text}
</li>);

