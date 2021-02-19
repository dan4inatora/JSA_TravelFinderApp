import axios from 'axios';

axios.defaults.baseURL = 'https://test.api.amadeus.com';

function fetchPointsOfInterest(addressCoords) {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', 'PJkllAaddAAeiGYEgpWl8VjE74jS23pM');
    params.append('client_secret', 'PwYk56p0BEFv0oVT');

    axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token?',
        params: params
    }).then((response) => {
        if(response && response.access_token) {
        console.log(response);
        //retrieveAccessToken(response.access_token);
        }
    }).catch((error) => {
        console.log(error);
    });
}

export default axios;