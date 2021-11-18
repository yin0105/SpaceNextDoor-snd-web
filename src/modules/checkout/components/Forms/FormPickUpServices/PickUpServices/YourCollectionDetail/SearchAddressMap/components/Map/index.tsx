import {
  withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';

interface ICoords {
  lat: number;
  lng: number;
}

interface IProps {
  coords: ICoords,
  loadingElement: React.ReactElement;
  containerElement: React.ReactElement;
  mapElement: React.ReactElement;
}

/**
 * Got list of bounds from this link: https://gist.github.com/graydon/11198540
 * Lat Max:  => N
 * Lat Min:  => S
 * Lng Max:  => E
 * Lng Min:  => W
 * TODO: LOCALIZATION country-change => Select bounds based on country domain
 */
const SINGAPORE_BOUNDS = {
  north: 1.4504753,
  south: 1.1304753,
  east: 104.0120359,
  west: 103.6920359,
};
const SINGAPORE_CENTER = {
  lat: 1.290270,
  lng: 103.851959,
};

export const Map = withGoogleMap((props: IProps) => (
  <GoogleMap
    options={{
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      restriction: { latLngBounds: SINGAPORE_BOUNDS },
    }}
    defaultZoom={18}
    defaultOptions={{ mapTypeControl: true }}
    defaultCenter={props.coords?.lat ? props.coords : SINGAPORE_CENTER}
  >
    {props.coords?.lat && (
      <Marker
        position={props.coords}
        animation={google.maps.Animation.BOUNCE}
      />
    )}
  </GoogleMap>
));
