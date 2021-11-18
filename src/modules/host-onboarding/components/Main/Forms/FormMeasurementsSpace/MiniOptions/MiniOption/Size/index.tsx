import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useCurrentCountry } from 'utilities/market';
import PrimaryTypography
  from '../../../../../../../../../components/Typographies/PrimaryTypography';
import Grey2Typography from '../../../../../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

interface IProps {
  size: number | string;
  sizeUnit: string
}

const Size: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    size,
    sizeUnit,
  } = props;
  const currentCountry = useCurrentCountry();
  const { t } = usePageTranslation('hostOnBoarding', 'Size');
  return (
    <Box className={classes.root}>
      <Box>
        <PrimaryTypography variant="h4">
          {`${size} ${currentCountry.sizeUnit}`}
        </PrimaryTypography>
      </Box>
      <Box>
        <Grey2Typography variant="caption">
          {`${currentCountry.sizeUnitLength} ${t('grey2Typography')}`}
        </Grey2Typography>
      </Box>
    </Box>
  );
};

export default Size;
