import {
  Box, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';
import Image from '../../../../../../../components/Image';
import Buttons from '../../Buttons';
import FormLayout from '../../../../../../../layouts/FormLayout';
import handleSubmit from '../../../../../../../utilities/handleSubmit';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({

  root: {
    margin: '12px 0',
  },
  verifiedBox: {
    marginTop: '14px',
    display: 'flex',
  },
  verifiedText: {
    paddingTop: '3px',
    paddingLeft: '10px',
  },
  contactNumberBox: {
    marginTop: '40px',
  },
  numberBox: {
    marginTop: '16px',
  },
}));

interface IProps {
  basement: string;
  phoneNumber: string;
  changeStep: (move: string) => void;
}

const FormNumberAdded: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const {
    basement, phoneNumber, changeStep,
  } = props;
  const phoneNumberWithSpace = `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)}`;
  const { t } = usePageTranslation('hostOnBoarding', 'FormNumberAdded');
  const nextStep = () => {
    changeStep('next');
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit(nextStep, null)}>

        <FormLayout>
          <Box className={classes.contactNumberBox}>
            <Typography variant="h3">
              {t('typography')}
            </Typography>
          </Box>
          <Box className={classes.numberBox}>
            <Typography variant="h3">
              {basement}
              {' '}
              {phoneNumberWithSpace}
            </Typography>
          </Box>

          <Box className={classes.verifiedBox}>
            <Box>
              <Image name="check" folder="LoginPage" />
            </Box>
            <Box className={classes.verifiedText}>
              <PrimaryTypography>
                {t('primaryTypography')}
              </PrimaryTypography>
            </Box>
          </Box>

        </FormLayout>

        <Buttons isLoading={false} changeStep={changeStep} />
      </form>

    </Box>
  );
};

export default FormNumberAdded;
