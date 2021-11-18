import { Box } from '@material-ui/core';
import React from 'react';
import usePageTranslation from '../hooks/usePageTranslation';
import ErrorCom from '../modules/error/index';

const style: {
  [key: string]: {
    mobWidth?: string;
    desktopWidth?: string;
  };
} = {
  400: {
    mobWidth: '90%',
    desktopWidth: '30%',
  },
  401: {
    mobWidth: '75%',
  },
  408: {
    mobWidth: '70%',
  },
  500: {
    mobWidth: '88%',
    desktopWidth: '35%',
  },
};

function Error({ statusCode }) {
  const { t } = usePageTranslation('error', statusCode);

  return (
    <Box>
      <ErrorCom
        title={t('title')}
        message={t('message')}
        name={statusCode}
        mobWidth={style[statusCode]?.mobWidth}
        desktopWidth={style[statusCode]?.desktopWidth}
      />
    </Box>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err && (err.statusCode || 404);
  return { statusCode: `${statusCode}` };
};

export default Error;
