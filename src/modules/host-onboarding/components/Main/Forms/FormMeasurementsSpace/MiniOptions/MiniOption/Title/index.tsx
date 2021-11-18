import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Grey2Typography from '../../../../../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../../../../../hooks/usePageTranslation';

interface IProps {
  index: number;
  title: string;
}

const Title: React.FC<IProps> = (props) => {
  const {
    index,
    title,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'Title');
  return (
    <Box>
      <Box>
        <Typography variant="h5">
          {`${t('typography')} ${index + 1}`}
        </Typography>
      </Box>
      <Box>
        <Grey2Typography variant="body2">
          {title}
        </Grey2Typography>
      </Box>
    </Box>
  );
};

export default Title;
