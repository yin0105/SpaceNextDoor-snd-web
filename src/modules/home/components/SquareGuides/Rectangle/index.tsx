import { Box, Grid, makeStyles } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import OneMiniSquare from './OneMiniSquare';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '18px',
  },
  gridContainer: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },
  },
  box: {
    boxShadow: '0px 15px 40px #E9E9E9',
    borderRadius: '15px',
    width: '90%',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      boxShadow: 'none',
      borderRadius: 0,
      overflow: 'unset',
    },
  },
  itemGrid: {
    display: 'flex',
    position: 'relative',
    border: `1px solid ${theme.palette.grey[50]}`,
    [theme.breakpoints.up('md')]: {
      maxWidth: '23%',
      // maxHeight: '241px',
      boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
      borderRadius: '32px',
      '&:not(:last-of-type)': {
        // marginRight: '20px',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '241px',
        maxHeight: '241px',
        boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
        borderRadius: '32px',
      },
    },
  },
}));

const Rectangle: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'Rectangle');
  const items = [
    { name: t('itemName1'), icon: 'home', link: '/estimator' },
    { name: t('itemName2'), icon: 'box', link: '/estimator-box' },
    { name: t('itemName3'), icon: 'inventory', link: '/estimator-box' },
    { name: t('itemName4'), icon: 'size', link: '/estimator' },
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Grid container spacing={1} className={classes.gridContainer}>
          {items.map((item, idx) => (
            <Grid key={item.icon} item xs={6} sm={3} md={3} lg={3} className={classes.itemGrid}>
              <OneMiniSquare
                name={item.icon}
                title={item.name}
                link={item.link}
                id={`miniSquare${idx}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Rectangle;
