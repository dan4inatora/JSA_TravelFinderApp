import {createSelector} from 'reselect';

const selectUserSearched = state => state.userSearched;

export const selectAmadeusAccessToken = createSelector(
    [selectUserSearched],
    (searched) => searched.userSearched
);