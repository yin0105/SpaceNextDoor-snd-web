import React from 'react';
import { AppBar, Tabs, Box } from '@material-ui/core';
import useStyles from '../Tabs/styles';
import TabPanel from '../Tabs/TabPanel';
import TabLink from '../Tabs/TabLInk';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import SearchInput from '../../../../components/SearchInput';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface Iprops {
  value: string,
  handleChange: (e: any, value: string) => void,
  tabs: string[],
  children: any,
  errorMessage: string,

}
const DesktopTabs:React.FC<Iprops> = ({
  value,
  handleChange,
  tabs,
  children,
  errorMessage,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'DesktopTabs');
  const translationTabs: string[] = [t('all'), t('confirmed'), t('completed'), t('cancelled')];

  return (
    <>
      <AppBar position="static" className={classes.maincontainer} color="transparent">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          TabIndicatorProps={{
            style: { background: '#00A0E3', height: '2px' },
          }}
        >
          {tabs.map((item: string, index: number) => (
            <TabLink key={`tab_${item}_${index}`} label={translationTabs[index].toLowerCase()} index={item} value={item} />
          ))}
        </Tabs>
      </AppBar>
      {tabs?.map((item: string, index: number) => item === value && (
        <TabPanel key={`tabpanel_${item}_${index}`} value={value} index={item}>
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
        </TabPanel>
      ))}
    </>
  );
};

export default DesktopTabs;
