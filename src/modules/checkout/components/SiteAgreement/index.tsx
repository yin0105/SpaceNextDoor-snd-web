import React, { useState } from 'react';
import {
  Box, Typography, makeStyles,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';

import usePageTranslation from '../../../../hooks/usePageTranslation';
import AgreementViewerModal from './modal';
import { BookingStore, BOOKING_STORE } from '../../stores/BookingStore';
import { getTranslatedName } from '../../../../utilities/market';

interface IProps {
  [BOOKING_STORE]?: BookingStore;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: '28px',
    paddingTop: '26px',
    borderTop: '2px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      border: 'none',
    },
  },
  link: {
    cursor: 'pointer',
    color: '#00A0E3',
    textDecoration: 'none',
  },
}));

const SiteAgreement: React.FC<IProps> = ({
  bookingStore: {
    space,
  },
}) => {
  const { t } = usePageTranslation('checkout', 'SiteAgreement');
  const { locale } = useRouter();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };
  const handleClickAway = () => setOpenModal(false);
  const AgreementLink = () => <a className={classes.link} href="#" onClick={toggleModal}>{t('typography2')}</a>;
  return (

    <Box className={classes.root}>
      <Typography variant="body1" color="initial">
        {t('typography1')}
        {' '}
        <AgreementLink />
        {' '}
        .
      </Typography>
      <AgreementViewerModal
        handleClickAway={handleClickAway}
        source={getTranslatedName(space?.site?.agreement, 'content', locale)}
        isOpen={openModal}
        toggleModal={toggleModal}
      />
    </Box>

  );
};

export default inject(BOOKING_STORE)(observer(SiteAgreement));
