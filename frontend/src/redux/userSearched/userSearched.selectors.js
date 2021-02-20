import {createSelector} from 'reselect';

const selectUserSearched = state => state.userSearched;

export const selectUserSearches = createSelector(
    [selectUserSearched],
    (searched) => searched
);