import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import usePageTranslation from '../../../hooks/usePageTranslation';

interface IProps {
  moveInDate: Dayjs;
  moveOutDate: Dayjs;
  isAvailable: boolean;
  checkAvailability(): void;
  siteId: number;
}

const useSpaceAvailabilityToast = ({
  moveInDate,
  moveOutDate,
  checkAvailability,
  isAvailable,
  siteId,
}: IProps): JSX.Element => {
  const { t } = usePageTranslation('checkout', 'UseSpaceAvailabilityToast');
  useEffect(() => {
    if (siteId) {
      checkAvailability();
    }
  }, [moveInDate, moveOutDate, siteId]);

  if (typeof isAvailable === 'undefined' || isAvailable) {
    return null;
  }

  return (
    <>
      <Snackbar open={!isAvailable} autoHideDuration={6000}>
        <Alert severity="error">
          {t('alert')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default useSpaceAvailabilityToast;
