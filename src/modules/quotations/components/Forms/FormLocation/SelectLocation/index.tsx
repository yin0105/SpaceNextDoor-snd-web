import React from 'react';
import {
  Box, Typography, Theme, List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import usePageTranslation from 'hooks/usePageTranslation';
import CustomCheckbox from 'modules/host-onboarding/components/Main/Forms/FormSiteFeatures/CustomCheckBox';
import { getTranslatedName } from 'utilities/market';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { QuotationsStore, QUOTATIONS_STORE_KEY } from 'modules/quotations/stores/QuotationsStore';

const useStyles = makeStyles((theme: Theme) => ({
  choices: {
    display: 'flex',
    borderBottom: `2px solid ${theme.palette.grey[50]}`,
  },
  choice: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
    paddingBottom: '12px',
    marginBottom: '-2px',
  },
  container: {
    marginTop: '40px',
  },
  allDistricts: {
    '& li': {
      width: '100%',
      paddingLeft: '0',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      width: '33.3%',
      paddingLeft: '0',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore
}

const SelectLocation: React.FC<IProps> = ({ quotationsStore }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('quotations', 'SelectLocation');
  const { districts, quotationDetails: { districtIds }, setQuotationDetails } = quotationsStore;

  const setDistrictIds = (val: number[]) => {
    setQuotationDetails('districtIds', val);
  };

  const handleChange = (id: number) => {
    if (id === 0) {
      setDistrictIds([0]);
    } else if (districtIds.indexOf(id) >= 0) {
      setDistrictIds(districtIds.filter((districtId) => districtId !== id));
    } else {
      setDistrictIds([...districtIds, id]);
    }
  };

  return (
    <Box>
      <Box className={classes.choices}>
        <Typography className={classes.choice}>{t('typography1')}</Typography>
      </Box>
      <Box className={classes.container}>
        <Box className={classes.allDistricts}>
          <CustomCheckbox
            label={t('allDistricts')}
            checked={districtIds.indexOf(0) === 0 && districtIds.length === 1}
            value={0}
            onChange={() => handleChange(0)}
          />
        </Box>
        <List className={classes.list}>
          {districts.map((district) => (
            <CustomCheckbox
              key={district?.id}
              label={getTranslatedName(district, 'name', router.locale)}
              checked={districtIds.indexOf(district?.id) >= 0}
              value={district?.id}
              onChange={() => handleChange(district?.id)}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(SelectLocation));
