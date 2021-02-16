import React, {useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import './destinations.styles.scss';

const DestinationsPage = () => {

    // return (
    //     <SearchBar fullWidth={true}/> 
    // )
    const [address, setAddress] = useState();

    const handleChange = event => {
        setAddress(event);
      };
     
    const handleSelect = address => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
    
    return (
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {/* {suggestions.map(suggestion => {
                    console.log(suggestion);
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
                <AutoComplete options={suggestions}/> */}
                {suggestions.length > 0 ? 
                        <ul className="options">
                            {suggestions.map((suggestion) => {
                            return (
                                <li className='option-active' key={suggestion.description}>
                                    {suggestion.description}
                                </li>
                            );
                            })}
                        </ul>
                    :
                        <div className="no-options">
                            <em>No Option!</em>
                        </div>
                    }
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
}

export default DestinationsPage;