import { useEffect, useRef } from 'react';
import {
  Box, fade, makeStyles, Theme, Typography, useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import {
  withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { ICenter } from '../../../search/components/GoogleMap';

interface ICoords {
  lat: number;
  lng: number;
}

interface IMapProps {
  coords: ICoords,
  loadingElement: React.ReactElement;
  containerElement: React.ReactElement;
  mapElement: React.ReactElement;
  zoom?: number;
  center?: ICoords;
  icon?: string;
  isDraggable?: boolean;
  setCenter?: (center: ICenter) => void;
}

interface IProps {
  coords: ICoords;
  loading?: boolean;
  className?: string;
  height?: string;
  zoom?: number;
  center?: ICoords;
  icon?: string;
  isDraggable?: boolean;
  setCenter?: (center: ICenter) => void;
  borderClassName?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '40px',
    paddingBottom: '40px',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    [theme.breakpoints.only('xs')]: {
      paddingBottom: '25px',
      paddingTop: '25px',
    },
  },
  borderMap: {
    borderRadius: 15,
  },
}));

const Map = withGoogleMap((props: IMapProps) => {
  const mapRef = useRef<GoogleMap>();

  const mapCenter = {
    lat: mapRef.current?.getCenter().lat(),
    lng: mapRef.current?.getCenter().lng(),
  };

  useEffect(() => {
    if (props?.setCenter) props.setCenter(mapCenter);
  }, [props?.zoom]);

  return (
    <GoogleMap
      ref={mapRef}
      zoom={props?.zoom || 17}
      defaultCenter={props.coords}
      options={{ draggable: !!props?.isDraggable, disableDefaultUI: true }}
      center={{
        lat: props?.center?.lat || props?.coords?.lat,
        lng: props?.center?.lng || props?.coords?.lng,
      }}
    >
      <Marker
        position={props.coords}
        icon={props?.icon}
      />
    </GoogleMap>
  );
});

const LocationMap: React.FC<IProps> = ({
  coords,
  loading,
  className,
  height,
  zoom,
  center,
  icon,
  isDraggable,
  setCenter,
  borderClassName,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const { t } = usePageTranslation('details', 'Map');
  return (
    <Box className={clsx(className || classes.root)}>
      {className ? (
        <Typography variant={isMobile ? 'h5' : 'h4'} style={{ marginBottom: '22px' }}>
          {t('typography')}
        </Typography>
      ) : (
        <Typography variant={isMobile ? 'h5' : 'h3'} style={{ marginBottom: '35px' }}>
          {t('typography')}
        </Typography>
      )}
      {loading && (
        <Skeleton height={400} className={classes.borderMap} animation="wave" variant="rect" />
      )}
      {!loading && (
        <Map
          setCenter={setCenter}
          isDraggable={isDraggable}
          icon={icon}
          zoom={zoom}
          center={center}
          coords={coords}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: height || '400px' }} />}
          mapElement={<div className={borderClassName || classes.borderMap} style={{ height: height || '100%' }} />}
        />
      )}
    </Box>
  );
};

export default LocationMap;
