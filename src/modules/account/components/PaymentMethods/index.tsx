import { useState } from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from '../../../../config';
import useStyles from '../styles';
import { ProfileQuery_profile } from '../../../shared/queries/__generated__/ProfileQuery';
import HostDetails from './HostDetails';
import GuestDetails from './GuestDetails';
import GuestForm from './GuestForm';
import HostForm from './HostForm';

interface IProps {
  title: string;
  user: ProfileQuery_profile;
  isHost?: boolean;
}

const PaymentMethod: React.FC<IProps> = ({ title, isHost, user }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (value) => {
    setIsEdit(value);
  };

  const renderGuestForm = () => {
    if (!isHost) {
      if (isEdit) {
        return (
          <Elements stripe={loadStripe(STRIPE_KEY)}>
            <GuestForm user={user} onCancel={() => handleEdit(false)} />
          </Elements>
        );
      }
      return <GuestDetails user={user} handleEdit={() => handleEdit(true)} />;
    }
    return null;
  };

  const renderHostForm = () => {
    if (isHost) {
      if (isEdit) {
        return <HostForm user={user} onCancel={() => handleEdit(false)} />;
      }
      return <HostDetails user={user} handleEdit={() => handleEdit(true)} />;
    }
    return null;
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {renderHostForm()}
        {renderGuestForm()}
      </Box>
      <Divider />
    </>
  );
};

export default PaymentMethod;
