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
    

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            url: 'https://test.api.amadeus.com/v2/shopping/hotel-offers'
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