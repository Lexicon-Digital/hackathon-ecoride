import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import requestAndroidLocationPermissions = MapboxGL.requestAndroidLocationPermissions;
import {Marker} from "./Marker";

const AccessToken = "";

MapboxGL.setAccessToken(AccessToken);

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})

type MapProps = {
    markers: GeoJSON.Position[];
};

export const Map: React.VFC<MapProps> = ({ markers }) => {
    const [currentLocation, setCurrentLocation] = useState<GeoPosition>()

    useEffect(() => {
        (async () => {
            const hasLocationPermission = await requestAndroidLocationPermissions();

            if (!hasLocationPermission) {
                return
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation(position)
                },
                (error) => {
                    // See error code charts below.
                    console.error("Error getting device's location")
                    console.error(error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            );
        })()
    }, []);

    return (
        <MapboxGL.MapView style={styles.map}>
            {currentLocation && <MapboxGL.Camera
                centerCoordinate={[currentLocation.coords.longitude, currentLocation.coords.latitude]}
                zoomLevel={15}
                animationMode={'flyTo'}
                animationDuration={1100}
            />}
            <MapboxGL.UserLocation />
            <View>
                {markers?.map((position, index) => <Marker key={position.join("-")} position={position} id={`${index}`} />)}
            </View>
        </MapboxGL.MapView>
    );
};