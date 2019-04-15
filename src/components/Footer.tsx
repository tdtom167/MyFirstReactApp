import {FilterLink} from './FilterLink'
import React from 'react';

export const Footer = () => (
    <p>
        Show: {' '}
        <FilterLink filter='SHOW_ALL'> All </FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'> Active </FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'> Complete </FilterLink>
    </p>);
