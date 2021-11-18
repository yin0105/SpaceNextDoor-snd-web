import {
  Box,
  makeStyles,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import Image from '../../../../../components/Image';
import MainInput from '../../../../../components/Inputs/MainInput';
import { SelectInput, CustomSelect, IconComponent } from '../../../../../components/Inputs/MainSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    padding: '40px 40px 10px',
    marginLeft: '15px',
    borderRadius: '14px',

    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
  headerBox: {
    padding: '0 15px',
  },
  header: {
    textAlign: 'center',
  },
  formBox: {
    margin: '24px 10px',
  },
  inputBox: {
    position: 'relative',
  },
  input: {
    fontSize: '16px',
  },
  inputSelect: {
    padding: '21px 26px 17px 12px',
  },
  searchIcon: {
    position: 'absolute',
    left: '13px',
    top: '12px',
    zIndex: 2,
  },
  selectBox: {
    marginTop: '18px',
    position: 'relative',
  },
  selectLabel: {
    position: 'absolute',
    display: 'block',
    top: '20px',
    left: '15px',
    zIndex: 1,
  },
  hidden: {
    display: 'none',
  },
  costBox: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  costText: {
    marginLeft: '5px',
  },
  actionBox: {
    margin: '29px  46px 0',
  },
  actionText: {
    fontWeight: 700,
  },

}));

const LoginForm = () => {
  const router = useRouter();
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [basement, setBasement] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/host-onboarding');
  };

  const handleChange = (e) => {
    setBasement(e.target.value);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Typography variant="h3" className={classes.header}>
          How much is your empty space worth?
        </Typography>
      </Box>

      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>

          <Box className={classes.inputBox}>
            <Box className={classes.searchIcon}>
              <Image name="location" folder="LoginPage" />
            </Box>
            <MainInput className={classes.input} fullWidth placeholder="Where are you?" />
          </Box>

          <Box className={classes.selectBox}>
            <Box className={basement ? classes.hidden : classes.selectLabel}>
              <Grey2Typography>
                Basement
              </Grey2Typography>
            </Box>
            <CustomSelect
              labelId="demo"
              fullWidth
              // classes={{icon: classes.icon}}
              IconComponent={IconComponent}
              input={<SelectInput classes={{ input: classes.inputSelect }} />}
              value={basement}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </CustomSelect>
          </Box>

          <Box className={classes.costBox}>
            <Typography variant="h1">
              $ 2,340
            </Typography>
            <Typography className={classes.costText}> a year</Typography>
          </Box>

          <Box className={classes.actionBox}>
            <PrimaryButton type="submit">
              <WhiteTypography className={classes.actionText}>
                LIST YOUR SPACE
              </WhiteTypography>
            </PrimaryButton>
          </Box>

        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
