import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl, Input, InputAdornment, IconButton, MuiThemeProvider } from '@material-ui/core';

const SearchBar = () => {
    const [searchString, setSearchString] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;

        setSearchString(value);
    }

    return (
        <FormControl>
            <Input
                id="standard-adornment-amount"
                value={searchString}
                placeholder='Search'
                onChange={handleChange}
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            />

        </FormControl>
    )
}

export default SearchBar;
