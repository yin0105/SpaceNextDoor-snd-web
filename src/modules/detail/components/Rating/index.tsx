import { Box, makeStyles, Typography } from '@material-ui/core';
import ClevertapReact from 'clevertap-react';
import { inject, observer } from 'mobx-react';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { useCurrentCountry } from '../../../../utilities/market';
import { IIntercomClevertapPayload } from '../../../../components/Intercom';
import AuthStore, { AUTH_STORE_KEY } from '../../../app/stores/AuthStore';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      alignItems: 'flex-start',
    },
  },
  stars: {
    marginRight: '6px',
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
  },
  reviewsText: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  line: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
    },
  },
  whatsapp: {
    marginBottom: '-5px',
    width: '125px',
    height: '30px',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      marginLeft: '-5px',
      marginBottom: '0',
    },
  },
}));

interface IProps {
  setIsOpen: (isOpen: boolean) => void;
  [AUTH_STORE_KEY]?: AuthStore;
}

const Rating: React.FC<IProps> = ({ setIsOpen, auth }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'Rating');
  const country = useCurrentCountry();

  const sendCleverTap = (value: string) => {
    const trackingPayload: IIntercomClevertapPayload = {
      type: value,
      CTSessionId: null,
      customerEmail: auth?.user?.email,
      customerPhone: auth?.user?.phone_number,
      customerName: `${auth?.user?.first_name}${auth?.user?.last_name}`,
      userId: auth?.user?.id || null,
      currency: country.currency,
      status: null,
      siteName: `social-link-${value}`,
      country: country.name,
    };
    ClevertapReact.event('chat_initiated ', trackingPayload);
    return true;
  };

  return (
    <Box className={classes.root}>
      {/* Rating to be added later when yotpo reviews are integrated */}
      <Box display="flex" alignItems="center">
        <Image className={classes.stars} name="stars" folder="DetailPage" />
        <Typography className={classes.reviewsText} onClick={() => setIsOpen(true)} variant="body2">
          {`${t('typography')}`}
        </Typography>
      </Box>
      {country.socialLink.line && (
        <a onClick={() => sendCleverTap('line')} href={country.socialLink.line} rel="noreferrer" target="_blank">
          <Image className={classes.line} name="line" folder="DetailPage" />
        </a>
      )}
      {country.socialLink.whatsapp
        && (
          <a onClick={() => sendCleverTap('whatsapp')} href={country.socialLink.whatsapp} rel="noreferrer" target="_blank">
            <Image className={classes.whatsapp} name="whatsapp" folder="DetailPage" />
          </a>
        )}
    </Box>
  );
};

export default inject(AUTH_STORE_KEY)(observer(Rating));
