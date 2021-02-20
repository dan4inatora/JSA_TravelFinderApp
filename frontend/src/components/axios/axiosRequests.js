import axios from 'axios';

export function fetchPointsOfInterest(addressCoords) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${addressCoords.lat}&longitude=${addressCoords.lng}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                resolve(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    })
}

export function fetchToursAndActivities(addressCoords) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/shopping/activities?latitude=${addressCoords.lat}&longitude=${addressCoords.lng}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                resolve(response.data.data)
            }
        }).catch((error) => {
            console.log(error);
            reject(error)
        });
    })
}

export function fetchHotels(addressCoords, budgetValue, dateRange) {
    //build string here and pass it to url
    let stringParams='';
    if(addressCoords.lat) {
        stringParams=`latitude=${addressCoords.lat}&longitude=${addressCoords.lng}`;
    }

    if(budgetValue) {
        stringParams = stringParams+ `&priceRange=${budgetValue[0]}-${budgetValue[1]}`;
    }

    stringParams = stringParams + '&currency=USD';
    // if(dateRange) {
    //     stringParams = stringParams+ `&dateRange=${dateRange[0]}`
    // }
    console.log('https://test.api.amadeus.com/v2/shopping/hotel-offers?' + stringParams);

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: 'https://test.api.amadeus.com/v2/shopping/hotel-offers?' + stringParams
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                resolve(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    })
}

export function fetchHotelById(hotelId, longitude, latitude) {


    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?latitude=${latitude}&longitude=${longitude}&hotelId=${hotelId}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                resolve(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    })
}


export function fetchRecommendedLocations(cityCode) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=${cityCode}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                resolve(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    })
}