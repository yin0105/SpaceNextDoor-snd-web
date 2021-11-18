import React, { FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import Item from './Item';
import Image from '../../../../components/Image';
import EstimatorStore, { ESTIMATOR_STORE } from '../../stores/EstimatorStore';
import { getTranslatedName } from '../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  categories: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '& img': {
      color: '#C4C4C4',
      height: '32px',
      minWidth: '32px',
    },
  },
  items: {
    display: 'flex',
    width: 'fit-content',
    padding: '0 30px',
    transition: '0.5s',
    transform: 'translateX(0)',
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      padding: 0,
    },
  },
  item: {
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '96px',
    height: '65px',
    border: '1px solid #C4C4C4',
    [theme.breakpoints.up('sm')]: {
      width: '124px',
      height: '84px',
    },
    '&:not(:last-of-type)': {
      marginRight: '5px',
      [theme.breakpoints.up('sm')]: {
        marginRight: '6px',
      },
    },
    '&.active': {
      backgroundColor: '#00A0E3',
      borderColor: '#00A0E3',
      '& h5': {
        color: '#FFFFFF',
      },
      '& img': {
        filter: 'brightness(0) invert(1)',
      },
    },
    '&>*': {
      textAlign: 'center',
    },
  },
  title: {
    color: '#C4C4C4',
    fontSize: '12px',
    lineHeight: '14px',
  },
  navigation: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#FFFFFF',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1,
    '& img': {
      width: '6px',
      height: '10px',
    },
  },
  preview: {
    left: '24px',
    transform: 'rotateZ(180deg)',
  },
  next: {
    right: '24px',
  },
  hidden: {
    display: 'none',
  },
}));

interface IProps {
  [ESTIMATOR_STORE]?: EstimatorStore;
}

const Categories: FC<IProps> = ({
  estimatorStore: { categories, categoryId: categoryIndex, selectCategory },
}) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const [width] = useState(
    categories.length * 96 + (categories.length - 1) * 10,
  );
  const [scroll, setScroll] = useState(0);
  const [offsetRight, setOffsetRight] = useState(0);
  const onResize = () => {
    setOffsetRight(width - document.body.clientWidth);
  };

  useEffect(() => {
    setOffsetRight(width - document.body.clientWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.categories}>
        <Box className={`${classes.navigation} ${classes.preview} ${scroll === 0 ? classes.hidden : ''}`} onClick={() => setScroll(scroll - 180)}>
          <Image name="arrow" folder="Navigation" />
        </Box>
        <Box className={classes.items} style={{ transform: `translateX(-${scroll}px)` }}>
          {categories.map((category, index) => (
            <Item
              name={getTranslatedName(category, 'name', locale)}
              icon={category.icon}
              className={`${classes.item} ${categoryIndex === category.id ? 'active' : ''}`}
              key={index}
              textClass={classes.title}
              onClick={() => {
                selectCategory(category.id);
              }}
            />
          ))}
        </Box>
        <Box className={`${classes.navigation} ${classes.next} ${scroll >= offsetRight ? classes.hidden : ''}`} onClick={() => setScroll(scroll + 180)}>
          <Image name="arrow" folder="Navigation" />
        </Box>
      </Box>
    </Box>
  );
};

export default inject(ESTIMATOR_STORE)(observer(Categories));
