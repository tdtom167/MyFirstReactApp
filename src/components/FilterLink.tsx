import { connect } from 'react-redux'
import { Link } from './Link'
import React from 'react';

//TODO not sure how there 2 work and how they pass the params to the Link component
export const mapStateToLinkProps = (state:{visibilityFilter:string}, ownprops:{filter:string}) => {
    return {
        active: ownprops.filter == state.visibilityFilter
    }
};


export const mapDispatchToLinkProps = (dispatch:Function, ownprops:{filter:string}) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownprops.filter))
        }
    }
}

export const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);




// OTHERS

//returns new action object with type SET_VISIBILITY_FILTER and filter according to an argument
// with the filter set this is than passed to the todoApp reducer and the state of the object is changed according to it
// called from mapDispatchToLinkProps
export const setVisibilityFilter = (filter:any) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }

}
