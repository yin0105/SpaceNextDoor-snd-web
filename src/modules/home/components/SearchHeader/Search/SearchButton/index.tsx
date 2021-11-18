import {
  makeStyles,
  Box,
} from '@material-ui/core';
import { PrimaryButton } from 'components/Buttons';
import { MouseEvent } from 'react';
import clsx from 'clsx';
import Image from 'components/Image';
import usePageTranslation from 'hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({

  searchBtn: {
    minWidth: '50px',
    width: '50px',
    padding: '12px 15px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 400,
    textTransform: 'none',
    margin: '4px 5px 0px 0px',
    height: '43px',
    transition: 'width 0.5s linear 0s',
  },
  searchBtnActive: {
    width: '100px',
  },
  searchLabel: {
    position: 'absolute',
    left: '35px',
    opacity: 0,
    paddingRight: '15px',
    transition: 'opacity 0.2s ease-in-out 0s',
  },
  searchLabelActive: {
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out 0.4s',
  },
  searchBtnIconActive: {
    marginTop: '5px',
    marginRight: '4px',
    transition: 'position 1s linear 0s',
  },
  searchBtnIconInActive: {
    position: 'absolute',
    top: '10px',
    left: '18px',
    transition: 'position 1s linear 0s',
  },
}));

interface IProps {
  activeState: boolean;
  onClickCallback: (event: MouseEvent) => void;
}

const SearchButton = ({ activeState, onClickCallback }: IProps) => {
  const { t } = usePageTranslation('search', 'SearchAutoComplete');
  const classes = useStyles();

  return (
    <PrimaryButton
      onClick={onClickCallback}
      className={clsx(classes.searchBtn, activeState && classes.searchBtnActive)}
      size="small"
      id="searchBtn"
    >
      <Box
        className={activeState
          ? classes.searchBtnIconActive
          : classes.searchBtnIconInActive}
      >
        <Image name="magnifier" asInlineEl />
      </Box>
      <Box className={
        activeState
          ? classes.searchLabelActive : classes.searchLabel
      }
      >
        {t('typography3')}
      </Box>
    </PrimaryButton>
  );
};

export default SearchButton;
