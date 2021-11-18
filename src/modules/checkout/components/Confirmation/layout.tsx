import React, { FC } from 'react';
import { Box } from '@material-ui/core/';

import { GetBookingQuery_booking } from '../../queries/__generated__/GetBookingQuery';
import BookingDetails from './BookingDetails';

interface IProps {
  booking: Omit<GetBookingQuery_booking, 'auth'>;
  loading?: boolean;
}

const BookingConfirmationLayout: FC<IProps> = ({ booking, loading }) => (
  <Box>
    <Box>
      <BookingDetails booking={booking} loading={loading} />
    </Box>
  </Box>
);

export default BookingConfirmationLayout;
