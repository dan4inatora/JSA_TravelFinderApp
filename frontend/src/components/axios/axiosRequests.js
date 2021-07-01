import axios from 'axios';

export function fetchPointsOfInterest(addressCoords) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/getPointOfInterest/${addressCoords.Lat}/${addressCoords.Lng}`,
            withCredentials: true
        }).then((response) => {
            if(response && response.data) {
                resolve(response.data.data);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export function fetchToursAndActivities(addressCoords) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/getToursAndActivities/${addressCoords.Lat}/${addressCoords.Lng}`,
            withCredentials: true
        }).then((response) => {
            if(response && response.data) {
                resolve(response.data.data)
            }
        }).catch((error) => {
            reject(error)
        });
    })
}

export function fetchHotels(addressCoords, budgetValue, dateRange) {
    return new Promise((resolve, reject) => {
        const reqBody = {
            method: 'GET',
            url: `http://localhost:3000/getHotels/${addressCoords.Lat}/${addressCoords.Lng}/${budgetValue[0]}-${budgetValue[1]}/${dateRange.startDate}-${dateRange.endDate}`,
            withCredentials: true
        };
        console.log(reqBody);
        axios(reqBody).then((response) => {
            if(response && response.data) {
                resolve(response.data.data);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export function fetchHotelById(hotelId, longitude, latitude) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/getHotelById/${latitude}/${longitude}/${hotelId}`,
            withCredentials: true
        }).then((response) => {
            if(response && response.data) {
                resolve(response.data.data);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}


export function fetchRecommendedLocations(cityCode) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/getRecommendations/${cityCode}`,
            withCredentials: true
        }).then((response) => {
            if(response && response.data) {
                resolve(response.data.data);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}