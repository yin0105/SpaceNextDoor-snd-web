import React from 'react';
import Box from '@material-ui/core/Box';
import Select from '../../../../components/Select';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import SearchInput from '../../../../components/SearchInput';
import useStyles from '../Tabs/styles';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  tabs: string[],
  children: any,
  errorMessage: string,
  value: string,
  handleChange: any,
}
const MobileVersion: React.FC<IProps> = ({
  tabs,
  children,
  errorMessage,
  value,
  handleChange,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'MobileVersion');
  return (
    <>
      <Select tabs={tabs} handleChange={handleChange} value={value} />
      <Box>
        <Box className={classes.inputWrapper}>
          <SearchInput disabled placeholder={t('placeholder')} />
        </Box>
        {children}
        {errorMessage && (
          <Box>
            <Grey2Typography variant="body2" style={{ color: '#E53535' }}>
              {errorMessage}
            </Grey2Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
export default MobileVersion;
