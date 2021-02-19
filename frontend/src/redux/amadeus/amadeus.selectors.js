import {createSelector} from 'reselect';

const selectAmadeus = state => state.amadeus;

export const selectAmadeusAccessToken = createSelector(
    [selectAmadeus],
    (amadeus) => amadeus.accessToken
);