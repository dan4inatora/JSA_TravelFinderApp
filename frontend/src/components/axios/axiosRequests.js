import axios from 'axios';

export function fetchPointsOfInterest(addressCoords) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/getPointOfInterest',
            data: {
                lng: addressCoords.Lng,
                lat: addressCoords.Lat
            },
            withCredentials: true
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
            url: 'http://localhost:3000/getToursAndActivities',
            data: {
                lat: addressCoords.Lat,
                lng: addressCoords.Lng
            },
            withCredentials: true
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
    console.log(dateRange);
    return new Promise((resolve, reject) => {
        const reqBody = {
            method: 'GET',
            url: 'http://localhost:3000/getHotels',
            data: {
                lat: addressCoords.Lat,
                lng: addressCoords.Lng,
                budgetValue: budgetValue,
                dateRange: `${dateRange.startDate}-${dateRange.endDate}`
            },
            withCredentials: true
        };
        console.log(reqBody);
        axios(reqBody).then((response) => {
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
            url: 'http://localhost:3000/getHotelById',
            data: {
                hotelId: hotelId, 
                longitude: longitude, 
                latitude: latitude
            },
            withCredentials: true
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
            url: 'http://localhost:3000/getRecommendations',
            data: {
                cityCode: cityCode
            },
            withCredentials: true
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