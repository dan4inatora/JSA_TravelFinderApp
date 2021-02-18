import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
  }));

const SearchResults = (props) => {
    const {data, budgetValue, dateRange} = props;
    const classes = useStyles();

    return (
        <div className="search-results-container">
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {data ? data.map((result) => (
                <GridListTile key={result.hotel.dupeId} cols={1}>
                    <img
                        src={`${result.hotel.media[0].uri}`}
                        alt={result.hotel.name}
                    />                
                </GridListTile>
                ))
                : 
                <div>No results found</div>}
            </GridList>
        </div>
    )
}

export default SearchResults;