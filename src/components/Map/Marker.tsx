import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Image, View} from 'react-native';
const MapPin = require('../../../resources/images/map-pin.png');

type MarkerProps = {
  position: GeoJSON.Position;
  id: string;
};

export const Marker: React.VFC<MarkerProps> = ({position: [lat, long], id}) => (
  <MapboxGL.MarkerView coordinate={[long, lat]} id={`marker-${id}`}>
    <View>
      <Image
        source={MapPin}
        resizeMethod={'scale'}
        style={{height: 30, width: 30, resizeMode: 'contain'}}
      />
    </View>
  </MapboxGL.MarkerView>
);
