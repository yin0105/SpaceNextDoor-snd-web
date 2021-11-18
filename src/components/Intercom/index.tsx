import { IntercomProvider, useIntercom } from 'react-use-intercom';
import ClevertapReact from 'clevertap-react';
import {
  makeStyles, Box,
} from '@material-ui/core';
import { FC, useState } from 'react';

export interface IIntercomClevertapPayload {
  type: string;
  CTSessionId: number|null;
  customerEmail: string;
  customerPhone: string|null;
  customerName: string;
  userId: number|null;
  currency: string;
  status: string;
  siteName: string;
  country: string;
}

interface IProps {
  trackingPayload: IIntercomClevertapPayload;
}

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

const useStyles = makeStyles((theme) => ({
  intercomLauncher: {
    position: 'fixed',
    zIndex: 2147483003,
    bottom: '150px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#007FAF',
    cursor: 'pointer',
    boxShadow: '0 1px 6px 0 rgb(0 0 0 / 6%), 0 2px 32px 0 rgb(0 0 0 / 16%)',
    outline: 0,
    transformOrigin: 'center',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intercomIconOpen: {
    backgroundImage: 'url(data:image/png;base64,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)',
    backgroundPosition: '50% 60%',
    backgroundSize: '54% 60%',
    opacity: 1,
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    transform: 'rotate(0deg) scale(1)',
  },
  intercomIconClose: {
    border: 'solid white',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    transform: 'rotate(45deg)',
    '-webkit-transform': 'rotate(45deg)',
  },
}));

const Children = ({
  isOpen, setIsOpen, isShowIcon, setShowIcon, trackingPayload,
}) => {
  const classes = useStyles();
  const { show, hide } = useIntercom();
  if (!isOpen) {
    setShowIcon(true);
  }
  const showChatBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      show();
      setShowIcon(false);
      ClevertapReact.event('chat_initiated ', trackingPayload);
    } else {
      setIsOpen(false);
      hide();
    }
  };

  const IconChildren = () => (
    <Box onClick={() => showChatBox()} className={classes.intercomLauncher}>
      { isOpen ? (
        <div className={classes.intercomIconClose} />
      ) : (
        <div className={classes.intercomIconOpen} />
      ) }
    </Box>
  );

  return (
    <>
      {isShowIcon && (
        <IconChildren />
      )}
    </>
  );
};

export const Intercom: FC<IProps> = ({ trackingPayload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowIcon, setShowIcon] = useState(true);

  return (
    <>
      <IntercomProvider
        appId={INTERCOM_APP_ID}
        autoBootProps={{
          hideDefaultLauncher: true,
        }}
        autoBoot
        onHide={() => setIsOpen(false)}
      >
        <Children
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isShowIcon={isShowIcon}
          setShowIcon={setShowIcon}
          trackingPayload={trackingPayload}
        />
      </IntercomProvider>
    </>
  );
};
