import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import FormLayout from '../../../../../../../layouts/FormLayout';
import WhiteButton from '../../../../../../../components/Buttons/WhiteButton';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  formLayout: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 20px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  boxButton: {
    minWidth: '166px',
  },
}));

interface IProps {
  changeOpen: () => void
}

const AddSizeOption: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { changeOpen } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'AddSizeOption');
  return (
    <Box>
      <Box>
        <Grey3Typography variant="h3">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <FormLayout className={classes.formLayout}>
        <Box className={classes.boxButton}>
          <WhiteButton onClick={changeOpen}>
            <PrimaryTypography>
              {t('primaryTypography')}
            </PrimaryTypography>
          </WhiteButton>
        </Box>
      </FormLayout>
    </Box>
  );
};

export default AddSizeOption;
