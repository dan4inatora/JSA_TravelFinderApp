import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapsComponent = (props) => {
    const {latitude, longitude} = props;
    const mapStyles = {
        width: '50%',
        height: '25%',
        border: '1px black',
        marginLeft: '5%'
    };

    return (
        <Map google={props.google} zoom={8} containerStyle={mapStyles}
            initialCenter={{ lat: latitude, lng: longitude}}>
            <Marker position={{ lat: latitude, lng: longitude}} />
        </Map>
    )
}

export default GoogleApiWrapper({apiKey: 'AIzaSyA9_KMYwmoMfYCeY2TzdZruJXLprnCZbwo'})(MapsComponent);