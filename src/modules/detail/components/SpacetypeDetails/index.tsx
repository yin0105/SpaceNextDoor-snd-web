import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Dialog, Box, Typography, Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { PrimaryButton } from 'components/Buttons';
import Image from 'components/Image';
import usePageTranslation from 'hooks/usePageTranslation';
import { groupBy } from 'lodash';
import {
  PlatformSpaceTypesQuery_space_types_edges,
  PlatformSpaceTypesQuery_space_types_edges_features_category,
} from 'modules/detail/queries/__generated__/PlatformSpaceTypesQuery';
import { getTranslatedName } from 'utilities/market';
import Head from 'next/head';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '90vw',
    maxWidth: '1300px',
    height: '90vh',
    maxHeight: '700px',
    borderRadius: '15px',
    margin: '0 !important',
    [theme.breakpoints.down('sm')]: {
      height: '94vh',
      maxHeight: '94vh',
    },
  },
  root: {
    display: 'flex',
    padding: '40px',
    height: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      flexFlow: 'column',
      padding: '0',
      overflow: 'hidden scroll',
    },
  },
  imagecontainer: {
    maxWidth: '58%',
    [theme.breakpoints.down('sm')]: {
      height: '230px',
      maxWidth: '100%',
      margin: '40px',
    },
  },
  spaceTypeImage: {
    width: '650px',
    height: '100%',
    maxHeight: '100%',
    borderRight: `2px solid ${theme.palette.grey[50]}`,
    marginRight: '30px',
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
      border: 'none',
      padding: '5px',
      maxHeight: '230px',
      height: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      margin: '20% 0',
      width: '450px',
      height: '450px',
    },
  },
  details: {
    display: 'flex',
    flexFlow: 'column',
    width: '45%',
    paddingRight: '40px',
    marginRight: '20px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: 'none',
      border: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      width: '95%',
      alignItems: 'center',
      paddingBottom: '30px',
      margin: '0 auto',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden scroll',
      width: '40%',
    },
  },
  name: {
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  size: {
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  description: {
    fontSize: '16px',
    margin: '25px 0',
    lineHeight: '30px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      width: '90%',
      fontSize: '14px',
      lineHeight: '22px',
    },
  },
  arrow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: '320px',
    '& img': {
      cursor: 'pointer',
      width: '20px',
      height: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      top: '18vh',
    },
  },
  increment: {
    right: 30,
    [theme.breakpoints.down('sm')]: {
      right: 15,
    },
  },
  decrement: {
    left: 30,
    [theme.breakpoints.down('sm')]: {
      left: 15,
    },
  },
  category: {
    fontSize: '16px',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  features: {
    padding: 0,
    marginBottom: '10px',
    listStyle: 'none',
    '& li': {
      fontSize: '16px',
      margin: '10px 0',
      '&::marker': {
        color: theme.palette.secondary.main,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        margin: 0,
      },
    },
  },
  close: {
    position: 'absolute',
    cursor: 'pointer',
    top: 20,
    right: 20,
    [theme.breakpoints.down('sm')]: {
      top: 10,
      right: 10,
    },
  },
  featuresContainer: {
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  subSection: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    padding: '15px 0',
    flexFlow: 'column',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  price: {
    fontSize: '22px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  priceText: {
    fontSize: '16px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      margin: 0,
    },
  },
  button: {
    color: 'white',
    fontWeight: 600,
    height: 'max-content',
    width: '140px',
    fontSize: '13px',
  },
}));

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  spaceTypeId: number;
  spaceTypes: PlatformSpaceTypesQuery_space_types_edges[]
  setSpaceTypeId?: (val: number) => void;
}

const SpaceTypeDetails: React.FC<IProps> = ({
  isOpen, setIsOpen, spaceTypeId, spaceTypes, setSpaceTypeId,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = usePageTranslation('details', 'SpaceTypeDetails');

  useEffect(() => {
    const spaceTypesId = spaceTypes.map((s) => s.id);
    setActiveIndex(spaceTypesId?.indexOf(spaceTypeId) || 0);
  }, [spaceTypeId]);

  const spaceType = spaceTypes[activeIndex];
  const features = spaceType?.features;

  const getGroupedItems = (): PlatformSpaceTypesQuery_space_types_edges_features_category[] => {
    const obj = groupBy(features, (i) => i.category?.id);
    const types = [];
    Object.keys(obj).forEach((id) => {
      if (obj[id][0]?.category) {
        types.push(obj[id][0]?.category);
      }
    });
    return types;
  };

  const categories = useMemo(() => getGroupedItems(), [spaceTypeId, activeIndex]);

  const decrementIndex = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(spaceTypes.length - 1);
    }
  };

  const incrementIndex = () => {
    if (activeIndex + 1 !== spaceTypes.length) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <>
      <Head>
        {spaceTypes.map((st) => (
          <link key={st?.id} rel="preload" as="image" href={st?.image} />
        ))}
      </Head>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{
          paperWidthSm: classes.paper,
        }}
      >
        <Box className={classes.root}>
          <Box className={classes.close}>
            <Image name="close" onClick={() => setIsOpen(false)} />
          </Box>
          <Box className={clsx(classes.arrow, classes.decrement)}>
            <Image name="arrowLeft" folder="DetailPage" onClick={decrementIndex} />
          </Box>
          <Box className={classes.imagecontainer}>
            <img src={spaceType?.image} alt="" className={classes.spaceTypeImage} />
          </Box>
          <Box className={classes.details}>
            <Typography className={classes.name}>{getTranslatedName(spaceType, 'name', locale)}</Typography>
            <Typography className={classes.size}>
              {spaceType?.size_from}
              {' '}
              -
              {' '}
              {spaceType?.size_to}
              {' '}
              {spaceType?.unit}
            </Typography>
            <Typography className={classes.description}>{getTranslatedName(spaceType, 'description', locale)}</Typography>
            <Box className={classes.featuresContainer}>
              {categories.map((c) => (
                <Box key={c.id}>
                  <Typography className={classes.category}>{getTranslatedName(c, 'name', locale)}</Typography>
                  <Box className={classes.features}>
                    {
                      features.map((feat, i) => (
                        feat.category.id === c.id ? <li key={i}>{getTranslatedName(feat, 'name', locale)}</li> : <></>
                      ))
                    }
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className={classes.section}>
              <Box className={classes.subSection}>
                <Typography className={classes.priceText}>{t('typography1')}</Typography>
                <Typography className={classes.priceText}>
                  <span className={classes.price}>
                    {spaceType?.spaces?.edges?.[0]?.prices?.[0]?.currency_sign}
                    {spaceType?.spaces?.edges?.[0]?.prices?.[0]?.price_per_month}
                  </span>
                  /
                  {t('typography2')}
                </Typography>
              </Box>
              <PrimaryButton
                className={classes.button}
                onClick={() => {
                  setSpaceTypeId?.(spaceType?.id);
                  setIsOpen(false);
                }}
              >
                {setSpaceTypeId ? t('select') : t('ok')}
              </PrimaryButton>
            </Box>
            <Box className={clsx(classes.arrow, classes.increment)}>
              <Image name="arrowRight" folder="DetailPage" onClick={incrementIndex} />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default SpaceTypeDetails;
