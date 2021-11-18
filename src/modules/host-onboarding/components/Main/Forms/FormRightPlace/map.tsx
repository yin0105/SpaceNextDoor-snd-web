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

export const LocationMap = withGoogleMap((props: IProps) => (
  <GoogleMap
    defaultZoom={19}
    defaultCenter={props.coords}
  >
    <Marker
      position={props.coords}
    />
  </GoogleMap>
));
