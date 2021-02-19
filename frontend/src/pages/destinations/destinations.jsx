import React, {useState, useEffect} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import CircleLoader from 'react-spinners/CircleLoader';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DestinationFilters from '../../components/destinationFilters/destinationFilters';
import SearchResults from '../../components/destinationFilters/searchResults';
import './destinations.styles.scss';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '0 auto', cursor: 'pointer',
        fontSize: '2rem',
        fontFamily: "Garamond Helvetica sans-serif",
        margin: '2rem'
    }
}));

const DestinationsPage = () => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const [budgetValue, setBudgetValue] = useState([1000,2000]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [selectedRadioButton, setValue] = useState('pointOfInterest');
    const [addressCoords, setAddressCoords] = useState({
      Lat: 0,
      Lng: 0
    })
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [showFilters, setShowFilters] = useState(true);
    const [showHotels, setShowHotels] = useState(true);

    useEffect(() => {
      console.log(dateRange, budgetValue);
    }, [dateRange, budgetValue]);

    const handleChange = event => {
        setAddress(event);
      };

    const handleSelect = (address, placeId, suggestion) => {
      setAddress(address);
      
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setAddressCoords(latLng))
      .catch(error => console.error('Error', error))

      setLoadingIndicator(true);
      setShowFilters(true);
      console.log(addressCoords);
    }

    const search = (budgetValue, dateRange, selectedRadioButton, addressCoords) => {
        if(selectedRadioButton === 'pointsOfInterest') {

        } else if(selectedRadioButton === 'tours') {

        } else if(selectedRadioButton === 'hotels') {

        }
    }

    return (
      <Container component="main" maxWidth="xl">
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
              value={address} {...getInputProps({placeholder: 'Search Places ...', className: 'location-search-input'})}/>
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.length > 0 ? 
                      <ul className="options">
                          {suggestions.map((suggestion) => {
                            console.log(suggestion);
                            const className = 'option-active';
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                              <li {...getSuggestionItemProps(suggestion, {className, style})}
                                className='option-active' key={suggestion.description} >
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
        
        <div className='loading-indicator'>
            <CircleLoader css={`z-index: 100;`} 
            size={80} color={"#36D2B3"} loading={loadingIndicator}/>
            {/* <div className='loader-message'>{loadingMessage}</div> */}
        </div>
        {showFilters ?
        <div>
            <DestinationFilters budgetValue={budgetValue} dateRange={dateRange} 
                setBudgetValue={setBudgetValue} setDateRange={setDateRange}
                selectedRadioButton={selectedRadioButton} setValue={setValue}/>
            <Button size="large" color="primary" className={classes.button} variant="contained" 
                onClick={() => search(budgetValue, dateRange, selectedRadioButton, addressCoords)}>
                Search
            </Button>
        </div>
        : null}
        {showHotels ? 
            <SearchResults data={data} budgetValue={budgetValue} dateRange={dateRange} selectedRadioButton={selectedRadioButton}/>
        : null}
      </Container>
      );
}

const data = [
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "HSBERAIQ",
          "chainCode": "HS",
          "dupeId": "700085430",
          "name": "Arte Luise Kunsthotel",
          "rating": "3",
          "cityCode": "BER",
          "latitude": 52.52159,
          "longitude": 13.37967,
          "hotelDistance": {
              "distance": 0.4,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "LUISENSTR. 19"
              ],
              "postalCode": "10117",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "(49) 30284480",
              "fax": "(49) 3028448448",
              "email": "info@luise-berlin.com"
          },
          "description": {
              "lang": "en",
              "text": "The hotel Arte Luise Kunsthotel in Berlin welcomes its guests in a pleasant and urbane ambience. It offers comfortable rooms that have been individually designed by famous artists. The rooms are equipped with bathroom/toilet, TV and free W-LAN. Regional and Mediterranean dishes are served in the restaurant ‘Habel’."
          },
          "amenities": [
              "24_HOUR_FRONT_DESK",
              "CASINO",
              "DOCTOR_ON_CALL",
              "ELEVATOR",
              "INTERNET_SERVICES",
              "PARKING",
              "GARAGE_PARKING",
              "SAFE_DEPOSIT_BOX",
              "VENDING_MACHINES",
              "ICE_MACHINES",
              "CONCIERGE",
              "DRIVING_RANGE",
              "NIGHT_CLUB",
              "WIRELESS_CONNECTIVITY",
              "CAR_RENTAL",
              "GIFT_SHOP",
              "LAUNDRY_SERVICE",
              "ATM/CASH_MACHINE",
              "FIRE_DETECTORS",
              "VIDEO_SURVEILANCE"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/09D175C6BF0C4E3AA84FFF567E716D01",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "VXD9VVKNIY",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "PRO",
              "rateFamilyEstimated": {
                  "code": "PRO",
                  "type": "P"
              },
              "commission": {
                  "percentage": "4.00"
              },
              "room": {
                  "type": "ROH",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM"
                  },
                  "description": {
                      "text": "Hot Deal\nStandard room A standard room consists of a room with shower-toilet or bathtub-toilet."
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "total": "70.00",
                  "variations": {
                      "average": {
                          "total": "70.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "total": "70.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "deposit": {
                      "acceptedPayments": {
                          "creditCards": [
                              "VI",
                              "MC",
                              "CA"
                          ],
                          "methods": [
                              "CREDIT_CARD"
                          ]
                      }
                  },
                  "paymentType": "deposit",
                  "cancellation": {
                      "deadline": "2021-02-16T00:42:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HSBERAIQ"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "HSBERAQE",
          "chainCode": "HS",
          "dupeId": "700128592",
          "name": "Adelante",
          "rating": "4",
          "cityCode": "BER",
          "latitude": 52.5284,
          "longitude": 13.39125,
          "hotelDistance": {
              "distance": 0.7,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "BORSIGSTR. 1"
              ],
              "postalCode": "10115",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "(49) 3020095060",
              "fax": "(49) 302009506666",
              "email": "office@hotel-adelante.de"
          },
          "description": {
              "lang": "en",
              "text": "The hotel Adelante Berlin-Mitte is a small, charming boutique hotel in a quiet side street of Berlin, surrounded by lively art scene, trendy bars and first-class restaurants. All 30 rooms are equipped with sound systems, free Wi-Fi Internet access, rain showers, air conditioning, ironing station and coffee and tea maker. Parking areas are available as well. In the mornings, the guests are served with a rich breakfast."
          },
          "amenities": [
              "24_HOUR_FRONT_DESK",
              "MULTILINGUAL_STAFF",
              "ELEVATOR",
              "INTERNET_SERVICES",
              "PARKING",
              "CONCIERGE",
              "DRIVING_RANGE",
              "NIGHT_CLUB",
              "WIRELESS_CONNECTIVITY",
              "DOCTOR_ON_CALL",
              "COFFEE_SHOP",
              "GIFT_SHOP",
              "TOUR_DESK",
              "LAUNDRY_SERVICE",
              "ROOM_SERVICE",
              "24_HOUR_ROOM_SERVICE",
              "BABY-SITTING",
              "ATM/CASH_MACHINE",
              "FIRE_DETECTORS",
              "VIDEO_SURVEILANCE"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/E4B23792BD1B4521820F000F38B57AC3",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "DJT2ECVJ9R",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "PRO",
              "rateFamilyEstimated": {
                  "code": "PRO",
                  "type": "P"
              },
              "commission": {
                  "percentage": "4.00"
              },
              "room": {
                  "type": "ROH",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM"
                  },
                  "description": {
                      "text": "Hot Deal\nStandard room A standard room consists of a room with shower-toilet or bathtub-toilet."
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "total": "140.00",
                  "variations": {
                      "average": {
                          "total": "140.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "total": "140.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "deposit": {
                      "acceptedPayments": {
                          "creditCards": [
                              "VI",
                              "MC",
                              "CA",
                              "AX"
                          ],
                          "methods": [
                              "CREDIT_CARD"
                          ]
                      }
                  },
                  "paymentType": "deposit",
                  "cancellation": {
                      "deadline": "2021-02-16T00:42:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HSBERAQE"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "MCBERMCM",
          "chainCode": "MC",
          "dupeId": "700022217",
          "name": "BERLIN MARRIOTT HOTEL",
          "rating": "4",
          "cityCode": "BER",
          "latitude": 52.51069,
          "longitude": 13.37531,
          "hotelDistance": {
              "distance": 1.6,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "INGE BEISHEIM PLATZ 1"
              ],
              "postalCode": "10785",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "49-30-220000",
              "fax": "49-30-220001000"
          },
          "amenities": [
              "BUSINESS_CENTER",
              "CONVENTION_CENTRE",
              "MEETING_ROOMS",
              "ICE_MACHINES",
              "RESTAURANT",
              "DISABLED_FACILITIES",
              "DISABLED_ACCESSIBLE_TOILETS",
              "SERVICE_DOGS_ALLOWED",
              "ACCESSIBLE_PARKING",
              "HANDRAILS_BATHROOM",
              "ELEVATOR",
              "EXCHANGE_FACILITIES",
              "WIFI",
              "LAUNDRY_SERVICE",
              "SAUNA",
              "SWIMMING_POOL",
              "AIR_CONDITIONING",
              "HAIR_DRYER",
              "MINIBAR",
              "NON_SMOKING_ROOMS",
              "DIRECT_DIAL_PHONE",
              "ROOM_SERVICE",
              "TELEVISION",
              "SAFE_DEPOSIT_BOX",
              "BALLROOM",
              "FITNESS_CENTER"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/67E089710FC9462DA04A677209B96CA3",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "OSA38YO5DR",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "S9R",
              "rateFamilyEstimated": {
                  "code": "SRS",
                  "type": "C"
              },
              "room": {
                  "type": "XMI",
                  "typeEstimated": {
                      "category": "DELUXE_ROOM",
                      "beds": 2,
                      "bedType": "DOUBLE"
                  },
                  "description": {
                      "text": "Marriott Senior Discount, includes 62 years and older valid ID \nDeluxe Room, 2 Double, 32sqm/344sqft, Living/si\ntting area, Wireless internet, complimentary, W"
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "base": "144.00",
                  "total": "151.20",
                  "variations": {
                      "average": {
                          "base": "144.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "base": "144.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "paymentType": "guarantee",
                  "cancellation": {
                      "deadline": "2021-02-17T23:59:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=MCBERMCM"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "CYBERMTC",
          "chainCode": "CY",
          "dupeId": "700047774",
          "name": "Courtyard Berlin City Center",
          "rating": "4",
          "cityCode": "BER",
          "latitude": 52.50977,
          "longitude": 13.39982,
          "hotelDistance": {
              "distance": 1.9,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "AXEL SPRINGER STRASSE 55"
              ],
              "postalCode": "10117",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "fax": "+49 30 8009281000",
              "phone": "+49 30 800 928 0",
              "email": "berlin.mitte@courtyard.com"
          },
          "description": {
              "lang": "en",
              "text": "For the ultimate in comfort and convenience here in Berlin's exhilarating Mitte district, book your visit to the Courtyard Berlin City Center. We're situated in the heart of the action, placing you near landmarks like Checkpoint Charlie, Potsdamer Platz, Brandenburg Gate and Alexanderplatz. You'll find it easy to relax in your modern, well-appointed hotel lodging; all of our spacious rooms showcase free high-speed Wi-Fi access, luxurious bedding, an ergonomic desk, a mini-fridge and more. Fuel up for your morning in the Mitte district with a hot breakfast buffet at Kitchen & Bar, or end your day with a delicious meal. We also provide a fully equipped fitness center, a sauna and an on-site coffee house. Host a meeting or social event with us here in Berlin city center to make use of 8,342 square feet of versatile venue space, cutting-edge event technology and innovative planning and catering. Make the Courtyard Berlin City Center your destination of choice for your visit to the Mitte district."
          },
          "amenities": [
              "SPA",
              "SAUNA",
              "EXPRESS_CHECK_OUT",
              "LOUNGE",
              "COFFEE_SHOP",
              "INTERIOR_ROOM_ENTRY",
              "SERVICE_DOGS_ALLOWED",
              "DISABLED_ACCESSIBLE_TOILETS",
              "HANDRAILS_BATHROOM",
              "SAFE_DEPOSIT_BOX",
              "EXCHANGE_FACILITIES",
              "LAUNDRY_SERVICE",
              "24_HOUR_FRONT_DESK",
              "GIFT_SHOP",
              "ICE_MACHINES",
              "FLORIST",
              "BEAUTY_PARLOUR",
              "CAR_RENTAL",
              "WEDDING_SERVICES",
              "GYM",
              "PARKING",
              "RESTAURANT",
              "HIGH_SPEED_INTERNET",
              "FREE_INTERNET",
              "WIRELESS_CONNECTIVITY",
              "ELEVATOR",
              "PRINTER",
              "PHOTOCOPIER",
              "BUSINESS_CENTER",
              "MEETING_FACILITIES",
              "HIGH_SPEED_INTERNET_IN_ROOM",
              "WI-FI_IN_ROOM",
              "NON_SMOKING_ROOMS",
              "TEA/COFFEE_MAKER",
              "ALARM_CLOCK",
              "AIR_CONDITIONING",
              "SAFE",
              "HAIR_DRYER",
              "IRON/IRON_BOARD",
              "CRIBS_AVAILABLE",
              "OUTLET_ADAPTERS",
              "TELEVISION",
              "CABLE_TELEVISION",
              "VOICEMAIL_IN_ROOM",
              "DIRECT_DIAL_PHONE",
              "FITNESS_CENTER",
              "BEACH",
              "BOWLING",
              "HORSE_RIDING",
              "VOLLEYBALL"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/CE392D9C1FCC4C49AFDAA565C174CD61",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "70AE8LR7VL",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "S9R",
              "rateFamilyEstimated": {
                  "code": "SRS",
                  "type": "C"
              },
              "room": {
                  "type": "XMI",
                  "typeEstimated": {
                      "category": "DELUXE_ROOM",
                      "beds": 1,
                      "bedType": "SINGLE"
                  },
                  "description": {
                      "text": "Marriott Senior Discount, includes 62 years and older valid ID \nDeluxe Room Twin, 2 Twin/Single Bed(s), Mini fr\nidge, 26sqm/280sqft, Living/sitting area, Wirel"
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "base": "59.00",
                  "total": "61.95",
                  "variations": {
                      "average": {
                          "base": "59.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "base": "59.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "paymentType": "guarantee",
                  "cancellation": {
                      "deadline": "2021-02-17T23:59:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=CYBERMTC"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "BWBER382",
          "chainCode": "BW",
          "dupeId": "700056415",
          "name": "Best Western Hotel am Spittelmarkt",
          "rating": "2",
          "cityCode": "BER",
          "latitude": 52.51075,
          "longitude": 13.40586,
          "hotelDistance": {
              "distance": 2.1,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "NEUE GRUNSTRASSE 28"
              ],
              "postalCode": "10179",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "+49 30 31161500",
              "fax": "+49 30 311615099",
              "email": "info@spittelmarkt-berlin.bestwestern.de"
          },
          "description": {
              "lang": "en",
              "text": "The Best Western Hotel am Spittelmarkt is situated in a peaceful side street in the heart of the city, a short walk from famous Friedrichstrasse. Due to the central location right by Spittelmart, all interesting sights are easily reached within minutes. The nearby underground stop takes you quickly and directly to the two hubs of Alexanderplatz in the east and Zoologischer Garten in the west. You can also easily reach attractions such as the Exhibition Centre, the Branderburg Gate, Gendarmenmarkt Square and Potsdamer Platz with its bars and restaurants. Come and stay in comfortable and modern guest rooms, including family rooms, and enjoy the delicious and varied breakfast buffet to give you a great start to an active day in Berlin. Enjoy our breakfast buffet at the fee of 12.00 EUR per person per day."
          },
          "amenities": [
              "ROOM_SERVICE",
              "INTERNET_SERVICES",
              "SAFE_DEPOSIT_BOX",
              "PETS_ALLOWED",
              "HIGH_SPEED_INTERNET",
              "24_HOUR_FRONT_DESK",
              "MULTILINGUAL_STAFF",
              "PARKING",
              "CONFERENCE_FACILITIES",
              "ELEVATOR",
              "RESTAURANT",
              "LAUNDRY_SERVICE",
              "WHEELCHAIR_ACCESSIBLE_ROOM",
              "SMOKE_DETECTOR",
              "EMERGENCY_LIGHTING",
              "FIRST_AID_STAF",
              "SPRINKLERS",
              "VIDEO_SURVEILANCE",
              "AUDIO-VISUAL_EQUIPMENT",
              "PHOTOCOPIER",
              "HIGH_SPEED_INTERNET_IN_ROOM",
              "SAFE",
              "ALARM_CLOCK",
              "TEA/COFFEE_MAKER",
              "CRIBS_AVAILABLE",
              "CABLE_TELEVISION",
              "DIRECT_DIAL_PHONE",
              "AIR_CONDITIONING"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/1BBCD9A70FE94FAF8B1959D2552E21B8",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "SANI24XGFE",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "AAA",
              "rateFamilyEstimated": {
                  "code": "AAA",
                  "type": "C"
              },
              "commission": {
                  "percentage": "10"
              },
              "room": {
                  "type": "B2T",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM",
                      "beds": 2,
                      "bedType": "SINGLE"
                  },
                  "description": {
                      "text": "AAA CAA RATE*MEMBERS MUST SHOW ID AT CHECK IN\n2 SINGLE BEDS,CFTRM,AC,WRKDSK,FREWL,COFTEA"
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "total": "102.00",
                  "variations": {
                      "average": {
                          "total": "102.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "total": "102.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "paymentType": "guarantee",
                  "cancellation": {
                      "deadline": "2021-02-18T16:00:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=BWBER382"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "HSBERAPO",
          "chainCode": "HS",
          "dupeId": "700141624",
          "name": "Hotel4Youth Am Mauerpark",
          "rating": "2",
          "cityCode": "BER",
          "latitude": 52.53969,
          "longitude": 13.40186,
          "hotelDistance": {
              "distance": 2.2,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "BERNAUER STR. 45-46"
              ],
              "postalCode": "10435",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "(49) 3045198880",
              "fax": "(49) 3045198889",
              "email": "mauerpark@hotel4youth.de"
          },
          "description": {
              "lang": "en",
              "text": "The Hotel4Youth Am Mauerpark in Berlin is directly located on the border strip of the former German Wall. The hotel's dedication to history is reflected in the large-scale photos with interesting motifs which are put up from the lobby to the rooms. All rooms include a private bathroom and toilet and are suitable for families, groups and business travellers alike."
          },
          "amenities": [
              "24_HOUR_FRONT_DESK",
              "MULTILINGUAL_STAFF",
              "CASINO",
              "DOCTOR_ON_CALL",
              "KIDS_WELCOME",
              "ELEVATOR",
              "INTERNET_SERVICES",
              "PARKING",
              "GARAGE_PARKING",
              "VENDING_MACHINES",
              "LOUNGE",
              "CONCIERGE",
              "DRIVING_RANGE",
              "WIRELESS_CONNECTIVITY",
              "DOCTOR_ON_CALL",
              "COFFEE_SHOP",
              "CAR_RENTAL",
              "GIFT_SHOP",
              "CONFERENCE_FACILITIES",
              "TOUR_DESK",
              "ATM/CASH_MACHINE",
              "FIRE_DETECTORS",
              "GOLF"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/4046BF11B3C4470E9E7060C292F9A095",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "3F2XGGGCBZ",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "RAC",
              "commission": {
                  "percentage": "4.00"
              },
              "room": {
                  "type": "ROH",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM"
                  },
                  "description": {
                      "text": "TradeFair-Rate\nStandard room A standard room consists of a room with shower-toilet or bathtub-toilet."
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "total": "75.00",
                  "variations": {
                      "average": {
                          "total": "75.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "total": "75.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "holdTime": {
                      "deadline": "2021-02-18T18:00:00"
                  },
                  "paymentType": "holdTime",
                  "cancellation": {
                      "numberOfNights": 1,
                      "deadline": "2021-02-18T17:00:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HSBERAPO"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "HIBER673",
          "chainCode": "HI",
          "dupeId": "700161750",
          "name": "HOLIDAY INN CTR ALEXANDERPLATZ",
          "rating": "2",
          "cityCode": "BER",
          "latitude": 52.52527,
          "longitude": 13.41968,
          "hotelDistance": {
              "distance": 2.5,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "THEANOLTE-BAEHNISCH-STRASSE 2"
              ],
              "postalCode": "10178",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "+49 30 7407470",
              "fax": "+49 30 740747399"
          },
          "description": {
              "lang": "en",
              "text": "The Holiday Inn Berlin Centre Alexanderplatz will be one of the finest, if not the finest Holiday Inn  in town. It will offer 242 ideally sized hotel rooms in different categories, many of them overlooking  the well known Alexanderplatz, only 2 minutes away from some of Berlin's most famous attractions counting amongst others: Berlin TV Tower, Boulevard \"Unter den Linden\", Museumsinsel with its famous Pergamon Museum, Bode Museum, Old National Galerie to name a few. The Art scene in Berlin \"Hackesche Hoefe\" with many Restaurants, Bars, Galeries and Boutiques is just a short hop away. Hoilday Inn Berlin Centre Alexanderplatz offers non smoking rooms only."
          },
          "amenities": [
              "24_HOUR_FRONT_DESK",
              "24_HOUR_ROOM_SERVICE",
              "CAR_RENTAL",
              "COFFEE_SHOP",
              "CONCIERGE",
              "CONFERENCE_FACILITIES",
              "EXCHANGE_FACILITIES",
              "DOCTOR_ON_CALL",
              "EXECUTIVE_FLOOR",
              "GYM",
              "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA",
              "HANDRAILS_BATHROOM",
              "ACCESSIBLE_PARKING",
              "WHEELCHAIR_ACCESSIBLE_ROOM",
              "GARAGE_PARKING",
              "JOGGING_TRACK",
              "LAUNDRY_SERVICE",
              "PARKING",
              "RESTAURANT",
              "SAFE_DEPOSIT_BOX",
              "TOUR_DESK",
              "TRANSLATION_SERVICES",
              "BEAUTY_PARLOUR",
              "WIRELESS_CONNECTIVITY",
              "PETS_ALLOWED",
              "FEMA_FIRE_SAFETY_COMPLIANT",
              "PRINTER",
              "AUDIO-VISUAL_EQUIPMENT",
              "BUSINESS_CENTER",
              "COMPUTER_RENTAL",
              "LCD/PROJECTOR",
              "OVERHEAD_PROJECTOR",
              "SECRETARIAL_SERVICES",
              "CONFERENCE_SUITE",
              "CONVENTION_CENTRE",
              "MEETING_FACILITIES",
              "FIRE_SAFETY",
              "EMERGENCY_BACKUP_GENERATOR",
              "EMERGENCY_LIGHTING",
              "FIRE_DETECTORS",
              "SPRINKLERS",
              "FIRST_AID_STAF",
              "EXTINGUISHERS",
              "FEMA_FIRE_SAFETY_COMPLIANT",
              "GOLF",
              "FITNESS_CENTER"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/FA2B3242BB914267BD404AA9F22E6F2B",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "YW15PHR6OV",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "22A",
              "rateFamilyEstimated": {
                  "code": "BAR",
                  "type": "P"
              },
              "room": {
                  "type": "*2T",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM",
                      "beds": 2,
                      "bedType": "TWIN"
                  },
                  "description": {
                      "text": "BEST FLEXIBLE RATE\n2 BED STANDARD NON SMOKING OUR MODERN STANDARD\nROOMS ARE EQUIPPED WITH TWIN BEDS WOODEN FLOOR "
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "base": "93.00",
                  "total": "99.51",
                  "variations": {
                      "average": {
                          "base": "93.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "base": "93.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "guarantee": {
                      "acceptedPayments": {
                          "creditCards": [
                              "AX",
                              "VI",
                              "CA"
                          ],
                          "methods": [
                              "CREDIT_CARD"
                          ]
                      }
                  },
                  "paymentType": "guarantee",
                  "cancellation": {
                      "numberOfNights": 1,
                      "deadline": "2021-02-16T00:31:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HIBER673"
  },
  {
      "type": "hotel-offers",
      "hotel": {
          "type": "hotel",
          "hotelId": "INBER64D",
          "chainCode": "IN",
          "dupeId": "700153792",
          "name": "HOTEL INDIGO CTR ALEXANDERPLAT",
          "rating": "2",
          "cityCode": "BER",
          "latitude": 52.51285,
          "longitude": 13.43056,
          "hotelDistance": {
              "distance": 3.4,
              "distanceUnit": "KM"
          },
          "address": {
              "lines": [
                  "BERNHARD WEISS STRASSE 5"
              ],
              "postalCode": "10178",
              "cityName": "BERLIN",
              "countryCode": "DE"
          },
          "contact": {
              "phone": "+49 30 5050860",
              "fax": "+49 30 505086299"
          },
          "description": {
              "lang": "en",
              "text": "The brand new design hotel is only footsteps away from the famous Alexanderplatz in the heart of the Mitte district. Our boutique hotels with 153 uniquely designed rooms are perfectly located in the heart of East Berlin and ideal for any kind of tours, activities and walks around the city. We offer free Wi Fi, Sky TV including Bundesliga, a refreshment and a welcome drink on arrival and free landline calls to 19 countries. Enjoy the rain shower in the modern bathrooms with Aveda products. A complimentary late night snack is served in the lobby."
          },
          "amenities": [
              "24_HOUR_FRONT_DESK",
              "24_HOUR_ROOM_SERVICE",
              "CAR_RENTAL",
              "COFFEE_SHOP",
              "CONFERENCE_FACILITIES",
              "EXCHANGE_FACILITIES",
              "DOCTOR_ON_CALL",
              "GYM",
              "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA",
              "HANDRAILS_BATHROOM",
              "ACCESSIBLE_PARKING",
              "WHEELCHAIR_ACCESSIBLE_ROOM",
              "GARAGE_PARKING",
              "JOGGING_TRACK",
              "LAUNDRY_SERVICE",
              "PARKING",
              "RESTAURANT",
              "TOUR_DESK",
              "TRANSLATION_SERVICES",
              "WIFI",
              "WIRELESS_CONNECTIVITY",
              "FEMA_FIRE_SAFETY_COMPLIANT",
              "PHOTOCOPIER",
              "PRINTER",
              "AUDIO-VISUAL_EQUIPMENT",
              "BUSINESS_CENTER",
              "COMPUTER_RENTAL",
              "LCD/PROJECTOR",
              "SECRETARIAL_SERVICES",
              "MEETING_FACILITIES",
              "FIRE_SAFETY",
              "EMERGENCY_BACKUP_GENERATOR",
              "EMERGENCY_LIGHTING",
              "FIRE_DETECTORS",
              "SPRINKLERS",
              "FIRST_AID_STAF",
              "EXTINGUISHERS",
              "FEMA_FIRE_SAFETY_COMPLIANT",
              "GOLF"
          ],
          "media": [
              {
                  "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/3C6F097D8FA34743B1A54B71A9657EFB",
                  "category": "EXTERIOR"
              }
          ]
      },
      "available": true,
      "offers": [
          {
              "id": "1ZLNFUSBDP",
              "checkInDate": "2021-02-18",
              "checkOutDate": "2021-02-19",
              "rateCode": "22A",
              "rateFamilyEstimated": {
                  "code": "BAR",
                  "type": "P"
              },
              "room": {
                  "type": "*RH",
                  "typeEstimated": {
                      "category": "STANDARD_ROOM"
                  },
                  "description": {
                      "text": "BEST FLEXIBLE RATE\nSTANDARD ROOM STYLISH STANDARD RM (16 – 18\nsq) WITH MINIBAR BODY AMENITIES SAFE ELECTRIC"
                  }
              },
              "guests": {
                  "adults": 1
              },
              "price": {
                  "currency": "EUR",
                  "base": "105.00",
                  "total": "105.00",
                  "variations": {
                      "average": {
                          "base": "105.00"
                      },
                      "changes": [
                          {
                              "startDate": "2021-02-18",
                              "endDate": "2021-02-19",
                              "base": "105.00"
                          }
                      ]
                  }
              },
              "policies": {
                  "guarantee": {
                      "acceptedPayments": {
                          "creditCards": [
                              "AX",
                              "VI",
                              "CA"
                          ],
                          "methods": [
                              "CREDIT_CARD"
                          ]
                      }
                  },
                  "paymentType": "guarantee",
                  "cancellation": {
                      "numberOfNights": 1,
                      "deadline": "2021-02-16T00:31:00+01:00"
                  }
              }
          }
      ],
      "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=INBER64D"
  }
]

const poisData = [
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "9CB40CB5D0",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/9CB40CB5D0",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.39165,
            "longitude": 2.164772
        },
        "name": "Casa Batlló",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "sightseeing",
            "sights",
            "museum",
            "landmark",
            "tourguide",
            "restaurant",
            "attraction",
            "activities",
            "commercialplace",
            "shopping",
            "souvenir"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "5F48B525B3",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/5F48B525B3",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.387573,
            "longitude": 2.175313
        },
        "name": "Palau de la Música Catalana",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "sightseeing",
            "landmark",
            "tourguide",
            "activities",
            "attraction",
            "events",
            "theater",
            "musicvenue",
            "sights",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "AF57D529B2",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AF57D529B2",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.40359,
            "longitude": 2.17436
        },
        "name": "La Sagrada Familia",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "church",
            "sightseeing",
            "temple",
            "sights",
            "attraction",
            "historicplace",
            "tourguide",
            "landmark",
            "professionalservices",
            "latte",
            "activities",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "6490DA6437",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/6490DA6437",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.36844,
            "longitude": 2.15357
        },
        "name": "Museu Nacional d'Art de Catalunya",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "museum",
            "sightseeing",
            "artgallerie",
            "sights",
            "tourguide",
            "restaurant",
            "attraction",
            "shopping",
            "activities",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "E0F7A78465",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/E0F7A78465",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.41068,
            "longitude": 2.226342
        },
        "name": "Parc del Fòrum",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "park",
            "attraction",
            "activities",
            "tourguide",
            "landmark",
            "sightseeing",
            "commercialplace",
            "professionalservices"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "DF1ABE30F1",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/DF1ABE30F1",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.347973,
            "longitude": 2.074765
        },
        "name": "RCDE Stadium",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "stadium",
            "sportclub",
            "sports",
            "events",
            "sightseeing",
            "commercialplace",
            "club",
            "shopping",
            "transport",
            "restaurant"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "631EC5882F",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/631EC5882F",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.38402,
            "longitude": 2.101542
        },
        "name": "Hospital Sant Joan de Déu Barcelona",
        "category": "SIGHTS",
        "rank": 5,
        "tags": [
            "hospital",
            "medicalcenter",
            "professionalservices",
            "sightseeing",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "29A0671F8C",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/29A0671F8C",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.3715,
            "longitude": 2.05582
        },
        "name": "Follia",
        "category": "RESTAURANT",
        "rank": 5,
        "tags": [
            "restaurant",
            "sightseeing",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "006829D957",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/006829D957",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.359634,
            "longitude": 2.076576
        },
        "name": "Los Arcos Bar",
        "category": "RESTAURANT",
        "rank": 5,
        "tags": [
            "restaurant",
            "tapas",
            "gastropub",
            "bar",
            "sightseeing",
            "commercialplace"
        ]
    },
    {
        "type": "location",
        "subType": "POINT_OF_INTEREST",
        "id": "AF47F131AE",
        "self": {
            "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AF47F131AE",
            "methods": [
                "GET"
            ]
        },
        "geoCode": {
            "latitude": 41.455376,
            "longitude": 2.206609
        },
        "name": "Lluerna",
        "category": "RESTAURANT",
        "rank": 5,
        "tags": [
            "restaurant",
            "sightseeing",
            "commercialplace",
            "seafood"
        ]
    }
]

const toursData = [
    {
        "id": "4602",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/4602",
            "methods": [
                "GET"
            ]
        },
        "name": "La Pedrera Night Experience: A Behind-Closed-Doors Tour in Barcelona",
        "shortDescription": "In Barcelona, go inside one of Antoni Gaudi’s most celebrated buildings, La Pedrera-Casa Milà, at night for a 1.5-hour multimedia event. The show, known as La Pedrera Night Experience, takes you on a colorful journey through the landmark, culminating in a rooftop show where neon lights and projections transform his spiraling rooftop chimneys into giant candy-colored clouds or a galaxy of stars. Top off the evening with sweeping views of Barcelona as it twinkles below you, and a glass of Cava.",
        "geoCode": {
            "latitude": "41.395037",
            "longitude": "2.161683"
        },
        "rating": "4.500000",
        "pictures": [
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/11/0c.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/i9uEK8aK?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "34.00"
        }
    },
    {
        "id": "4645",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/4645",
            "methods": [
                "GET"
            ]
        },
        "name": "Gaudi's Casa Batlló Admission Ticket with Smart Guide",
        "shortDescription": "Step inside Antoni Gaudi’s Casa Batlló in Barcelona with this entrance ticket and explore this incredible museum with a Smart guide. One of the best examples of Gaudi’s architectural genius, the Modernist building was created to be the most eye-catching family home in 20th-century Barcelona. Admire Gaudi’s use of light, space and color to create a place full of unique character, and learn about the man himself and his life in Barcelona!",
        "geoCode": {
            "latitude": "41.391700",
            "longitude": "2.164918"
        },
        "rating": "4.600000",
        "pictures": [
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/af/d9/eb.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/7rtcqNyq?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "25.00"
        }
    },
    {
        "id": "65217",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/65217",
            "methods": [
                "GET"
            ]
        },
        "name": "La Pedrera skip-the-line tickets with audio guide",
        "shortDescription": "Discover La Pedrera with an audio-guided visit. Explore the Espai Gaudí, the Pedrera Apartment, the courtyards, the exhibition room, and the roof terrace.",
        "geoCode": {
            "latitude": "41.395405",
            "longitude": "2.161940"
        },
        "rating": "4.500000",
        "pictures": [
            "https://images.musement.com/cover/0004/07/thumb_306443_cover_header.jpeg?w=500"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/mOOWyEsq?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "22.00"
        }
    },
    {
        "id": "102111",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102111",
            "methods": [
                "GET"
            ]
        },
        "name": "Hop-On Hop-Off Barcelona City Tour 1 or 2 Day",
        "shortDescription": "Discover Barcelona at your own pace on a double-decker hop-on hop-off bus tour! Choose from 1 or 2 days and access 2 routes with stops at the best sites in Barcelona! Plus, enjoy audio commentary in 15 different languages as you travel through the city.",
        "geoCode": {
            "latitude": "41.387360",
            "longitude": "2.169696"
        },
        "rating": "4.499300",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-263339-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/ObjTriJdLd?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "30.00"
        }
    },
    {
        "id": "102120",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102120",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona Hop-on Hop-off Tour: 1 or 2- Day Ticket",
        "shortDescription": "See the fascinating city of Barcelona on a comfortable and convenient hop-on hop-off bus tour. You’ll travel on open-top double-decker buses that cover 3 different routes. Your 1-day or 2-day ticket makes it possible see all that Barcelona has to offer!",
        "geoCode": {
            "latitude": "41.387015",
            "longitude": "2.170047"
        },
        "rating": "4.546300",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-1089291-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/36jIo91I3o?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "30.00"
        }
    },
    {
        "id": "102132",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102132",
            "methods": [
                "GET"
            ]
        },
        "name": "Skip the Line: Hard Rock Cafe Barcelona",
        "shortDescription": "Skip the line at Hard Rock Cafe Barcelona and enjoy priority entrance. Choose from 2 menus featuring high-quality American food in a setting that celebrates music and features an array of rock 'n' roll memorabilia. Non-alcoholic beverage included.",
        "geoCode": {
            "latitude": "41.386411",
            "longitude": "2.170863"
        },
        "rating": "4.505900",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-338252-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/aqlPPIVHz6?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "20.00"
        }
    },
    {
        "id": "102174",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102174",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona Card: 3, 4, or 5 Days with Discounts",
        "shortDescription": "See the best of Barcelona for a flat fee with the Barcelona Card. Choose from 3-5 days and during that time enjoy free travel on public transport, plus free offers at museums, cultural venues, leisure facilities, nightclubs, shops, restaurants, and more.",
        "geoCode": {
            "latitude": "41.387917",
            "longitude": "2.169919"
        },
        "rating": "4.230400",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-315673-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/brbEWFT8zR?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "46.00"
        }
    },
    {
        "id": "102215",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102215",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona: E-Bike Tour with Montjuic Cable Car And Boat Trip",
        "shortDescription": "Explore Barcelona from the saddle of an electric bike and see more of the city’s most emblematic attractions. Cruise through the Gothic quarter and port, ride the cable car to Montjuic and sail to the Old Port by Goleta boat.",
        "geoCode": {
            "latitude": "41.383556",
            "longitude": "2.175455"
        },
        "rating": "4.704100",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-515728-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/DI4X0gZSHN?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "50.00"
        }
    },
    {
        "id": "102243",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102243",
            "methods": [
                "GET"
            ]
        },
        "name": "Montserrat, Tapas and Wine Half-Day Tour from Barcelona",
        "shortDescription": "Taste delicious Spanish wines and tapas at the 10th-century Oller del Mas castle on a 7-hour tour from Barcelona that also includes a short visit to the stunning Montserrat mountain complex, surrounded by gorgeous fields and jaw dropping views.",
        "geoCode": {
            "latitude": "41.385954",
            "longitude": "2.170634"
        },
        "rating": "4.742800",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-661014-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/uPNTJ6S5k8?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "70.00"
        }
    },
    {
        "id": "102257",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102257",
            "methods": [
                "GET"
            ]
        },
        "name": "Palau de la Música Guided Tour",
        "shortDescription": "Explore an icon of Barcelona’s Modernist architecture on a 45-minute guided tour of the Palau de la Música Catalana, with access to areas of the iconic building normally off limits to the public. Admire refined architectural details, and more.",
        "geoCode": {
            "latitude": "41.387587",
            "longitude": "2.175239"
        },
        "rating": "4.605100",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-306547-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/IV73K3fZf6?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "20.00"
        }
    },
    {
        "id": "102320",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102320",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona: Barrio Gotico City Tour in German",
        "shortDescription": "Travel back in time to the Middle Ages and see how every stone has a story to tell on this walking tour through winding alleyways and picturesque squares of Barcelona's gothic quarter.",
        "geoCode": {
            "latitude": "41.386146",
            "longitude": "2.171159"
        },
        "rating": "4.941700",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-295451-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/7SMxoEUHHG?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "20.00"
        }
    },
    {
        "id": "102336",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102336",
            "methods": [
                "GET"
            ]
        },
        "name": "Casa Milà-La Pedrera: Skip The Line Ticket & Audio Guide",
        "shortDescription": "Explore one of the icons of Barcelona with a skip-the-line ticket to the Casa Milà (La Pedrera), Antoni Gaudi’s groundbreaking apartments on the Passeig de Gracia. See the Espai Gaudi exhibition, dedicated to Gaudi’s life and architectural innovations.",
        "geoCode": {
            "latitude": "41.395381",
            "longitude": "2.161961"
        },
        "rating": "4.644500",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-1849782-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/iAiVP5D4O5?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "22.00"
        }
    },
    {
        "id": "102337",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102337",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona 1-Hour Flamenco Show at Palacio del Flamenco",
        "shortDescription": "Immerse yourself in the sensuous rhythms of Spanish flamenco at a 1-hour show at Barcelona’s Palacio del Flamenco. Choose from 3 unique performances, each presented by an enthusiastic cast of flamenco dancers, singers and musicians.",
        "geoCode": {
            "latitude": "41.393675",
            "longitude": "2.156687"
        },
        "rating": "4.542100",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-520777-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/wDUrEjcAck?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "35.00"
        }
    },
    {
        "id": "102368",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102368",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona: La Pedrera Night Experience",
        "shortDescription": "Skip the lines to one of Barcelona’s most iconic buildings and watch an amazing audiovisual display on the roof terrace. Get a short introduction to Gaudi’s revolutionary building on the Passeig de Gracia, and see multiple projections in the stairwells.",
        "geoCode": {
            "latitude": "41.395384",
            "longitude": "2.161962"
        },
        "rating": "4.364900",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-416642-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/zLA3Wdg8ac?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "34.00"
        }
    },
    {
        "id": "102466",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102466",
            "methods": [
                "GET"
            ]
        },
        "name": "Small Group Walking Tour with Helicopter Flight & Boat Trip",
        "shortDescription": "Discover the best of Barcelona from multiple perspectives on a 4-hour tour by land, sea, and air. Stroll through the Gothic Quarter and travel back to the Middle Ages. Enjoy bird’s eye views on a helicopter flight and sail the coastline.",
        "geoCode": {
            "latitude": "41.383556",
            "longitude": "2.175455"
        },
        "rating": "4.699100",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-2563443-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/Kkgqx5u5Ce?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "109.00"
        }
    },
    {
        "id": "102626",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/102626",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona: Flamenco Show at City Hall Theater",
        "shortDescription": "Experience the passion of flamenco music and dance with a ticket to a 1-hour performance at Barcelona's historic City Hall Theater. Marvel at the artistry of the talented performers and get into the spirit of an authentic form of Spanish dance.",
        "geoCode": {
            "latitude": "41.387839",
            "longitude": "2.168472"
        },
        "rating": "4.163000",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-1877577-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/8oBNONMPz8?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "18.00"
        }
    },
    {
        "id": "140141",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/140141",
            "methods": [
                "GET"
            ]
        },
        "name": "Casa Milà - La Pedrera: Fast Track Entrance with Audioguide",
        "shortDescription": "What to Expect\nYour tickets allow you to skip the ticket line and head straight to the entrance gate. The ticket remains valid through the day and you can visit the landmark anytime between 9:00 AM and 8:00 PM when the last entry is granted. Unconventional though Casa Mila's appearance may be, the actual purpose of the structure is as conventional as it can be. After all, the building is, first and foremost, residential in nature. It's hard imagining that the place was designed to be anyone's home, but as you walk through Casa Mila's lavishly adorned lobbies or the sprawling courtyards peppered with Gaudi's signature embellishments, living here seems like a dream come true. Touring the Casa Mila by day involves visiting two different parts of the museum - the Espai Gaudi and the Pedera Apartment. The former includes a broad showcase of Guadi’s work and is divided into sections dedicated to different projects and shows his life in broad strokes. The latter is a fascinating recreation of the home of a bourgeois family in Barcelona from the first third of the 20th century. Perhaps the true treasure of the building is the view from the rooftop that is decorated with distinctive corkscrew style chimneys, synonymous with the building itself. The view of Barcelona's skyline from the top of the structure is nothing short of breathtaking so any time spent here is time well spent. Enhance your trip with the free audio guide included on this tour which will give you information on the main areas of the building, the sites you can visit and the architect himself. Once the 90-minute long commentary that is available in multiple languages on the audio guide runs out, you are more than free to explore on your own.",
        "geoCode": {
            "latitude": "41.395302",
            "longitude": "2.162019"
        },
        "rating": "4.600000",
        "pictures": [
            "https://cdn-imgix.headout.com/tour/5251/TOUR-IMAGE/0c6a9c84-d98c-4cd9-bdf9-5b6d7f1b83b8-3394-barcelona-casa-mila-la-pedrera-skip-the-line-access-01.png?w=500"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/t1sZRvXjMq?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "22.00"
        }
    },
    {
        "id": "140292",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/140292",
            "methods": [
                "GET"
            ]
        },
        "name": "Hola Barcelona Travel Card",
        "shortDescription": "The ultimate transportation pass in Barcelona, Hola Barcelona Transportation Pass, offers unlimited travel in the city. Explore the city, its iconic and world-famous architecture and points of interest at your own pace, and don’t worry about how you’ll get there. This pass has that covered. Feel free to use the metro, buses, and trams covered under this pass as many times as you’d like and save time and money on the expensive taxi fares in the city. This is the pass to have if you want to have the luxury of planning your own itinerary and exploring the city and its sights!\nThe pass has five variants, you can select from, 2 days, 3 days, 4 days, 5 days or opt for a BCN 2-day card. With their long validity, you’re guaranteed to save money on travel which you can utilize to indulge in some of the delicious Catalan cuisines. Not just that, the city’s metro and bus network is one of the best in Europe and is arguably the best means to discover the city. Additionally, with these passes, you also have the added convenience of being able to change your plans at your whim!\nHola Barcelona Transportation Pass Highlights Unlimited access to the trams, buses run by TMB, metro lines, FGC network, and RENFE suburban trains\nSave a bucket-load of money that you would’ve spent on taxi/cab fares in Barcelona by availing public transportation services\nSelect among five different time variants and choose the one which suits you best\nStart saving money on transport from the moment you land at the airport! Why You Shouldn’t Miss This\nThe Hola Barcelona Transportation Pass is perfect if you’re planning to explore the city at your own pace and comfort. Barcelona is a city famous for its architecture and landmark monuments. Not just that, the city is also filled with quaint boulevards, charming streets, and a majestic sea-facing promenade. The best way to check out these sights is by walking through the landscapes, and with a well-connected public network, you can take the bus, metro or tram at any point you feel tired. Another advantage offered by this pass is the perk of airport connectivity. With this pass, you can begin saving on the high rates of taxis and cab fares right from the moment you land in the city. With unlimited access to public transport services, you really don’t have to worry about getting around the city!",
        "geoCode": {
            "latitude": "41.386627",
            "longitude": "2.171416"
        },
        "rating": "4.700000",
        "pictures": [
            "https://cdn-imgix.headout.com/tour/14427/TOUR-IMAGE/2babb5aa-8889-4618-81b6-58619a628023-7890-barcelona-hola-barcelona-unlimited-transportation-pass--2?w=500"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/HPaPGiimSS?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "16.00"
        }
    },
    {
        "id": "339381",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/339381",
            "methods": [
                "GET"
            ]
        },
        "name": "Casa Batlló Blue tickets",
        "shortDescription": "Discover one of Gaudí's masterpieces, a UNESCO World Heritage site and enjoy an immersive experience thanks to the augmented reality of a smart guide.",
        "geoCode": {
            "latitude": "41.391638",
            "longitude": "2.164770"
        },
        "rating": "4.600000",
        "pictures": [
            "https://images.musement.com/cover/0003/68/thumb_267362_cover_header.jpeg?w=500"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/2U60y8HsW3?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "25.00"
        }
    },
    {
        "id": "354917",
        "type": "activity",
        "self": {
            "href": "https://test.api.amadeus.com/v1/shopping/activities/354917",
            "methods": [
                "GET"
            ]
        },
        "name": "Barcelona: Casa Batlló Entrance Ticket with Smart Guide",
        "shortDescription": "Discover Casa Batlló, one of Gaudí’s masterpieces, in an immersive experience. Explore this UNESCO World Heritage site with a virtual reality smart guide while learning about an architecture and design legend.",
        "geoCode": {
            "latitude": "41.391638",
            "longitude": "2.164770"
        },
        "rating": "4.614300",
        "pictures": [
            "https://cdn.getyourguide.com/img/tour_img-1944052-145.jpg"
        ],
        "bookingLink": "https://b2c.mla.cloud/c/xCA9Wt50ID?c=2WxbgL36",
        "price": {
            "currencyCode": "EUR",
            "amount": "25.00"
        }
    }
];

export default DestinationsPage;