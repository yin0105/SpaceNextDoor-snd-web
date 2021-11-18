import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Heading from '../../../../components/Heading';
import ReservationsTabs from '../../components/Tabs';
import { Roles } from '../../contants/role';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  role: Roles;
}

const Reservations: React.FunctionComponent<IProps> = ({ role }): JSX.Element => {
  const { t } = usePageTranslation('hostReservation', 'Reservations');
  return (
    <Grid container justify="center">
      <Grid item xs={11} sm={10}>
        <Box>
          <Heading
            title={role === Roles.GUEST ? t('title1') : t('title2')}
            subTitle={`${t('subtitle')} ${role === Roles.GUEST ? t('subtitle1') : t('subtitle2')}`}
            showFilter
          />
          <ReservationsTabs role={role} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reservations;
