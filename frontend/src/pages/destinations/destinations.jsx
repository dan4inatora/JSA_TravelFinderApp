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
    const [dateRange, setDateRange] = useState({});
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
            <DestinationFilters budgetValue={budgetValue} setBudgetValue={setBudgetValue} setDateRange={setDateRange}/>
            <Button size="large" color="primary" className={classes.button} variant="contained">
                Search
            </Button>
        </div>
        : null}
        {showHotels ? 
            <SearchResults data={data} budgetValue={budgetValue} dateRange={dateRange}/>
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

export default DestinationsPage;