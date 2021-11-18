import {
  Grid,
  Box,
  List,
  ListItem,
  Typography,
  ListItemText,
  makeStyles,
  Theme,
  fade,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Image from '../../../../components/Image';
import DropdownMenu from '../../../../components/Dropdowns/dropdownMenu';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { getResizedURL } from '../../../../utilities/imageResizer';

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    flexWrap: 'nowrap',
    padding: '15px',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },

    '&:hover': {
      background: fade(theme.palette.grey[50], 0.3),
      borderRadius: '15px',
    },
  },
  listitems: {
    padding: '0px',
  },
  itemTitle: {
    fontSize: '18px',
    lineHeight: '20px',
    marginBottom: '4px',
    textTransform: 'capitalize',
  },
  listitem: {
    padding: '0px',
    marginTop: '4px',
    '& span': {
      fontSize: '15.56px',
      lineHeight: '19px',
    },
    '& img': {
      width: '18px',
      marginRight: '7px',
    },
  },
  listingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '25px',
    },
  },
  itemBoxContainer: {
    paddingLeft: '16px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      flex: 1,
    },
  },
  menuContainer: {
    '& .MuiPaper-root': {
      borderRadius: '15px',
      border: '2px solid rgba(224, 224, 224, 1)',
      boxShadow: 'none',
    },
  },
  listImg: {
    width: '78px',
    height: '78px',
    borderRadius: '10px',
    marginRight: '15px',
  },
  btnClass: {
    width: '30px',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
    },
  },
  btnWrapper: {
    alignSelf: 'baseLine',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const ItemList: any = ({
  title, address, rating, imgSrc, id,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('hostListings', 'ListItem');
  const menuItems: any = [
    {
      name: t('menuItem'),
      onClick: () => router.push(`/host/listings/edit/${id}`),
    },
    // {
    //   name: 'Delete',
    // },
  ];

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item>
        {imgSrc && (
          <img className={classes.listImg} src={getResizedURL(imgSrc, { width: 300 })} alt="" />
        )}
      </Grid>
      <Grid
        item
        container
        className={classes.listingContainer}
      >
        <Box className={classes.itemBoxContainer}>
          <List className={classes.listitems}>
            <Typography className={classes.itemTitle} variant="h5">{title}</Typography>
            <ListItem className={classes.listitem}>
              <Image name="location" folder="SearchLocation" />
              <ListItemText>{address}</ListItemText>
            </ListItem>
            {/* <ListItem className={classes.listitem}>
              <Image name="rating" folder="Host" />
              <ListItemText>{rating}</ListItemText>
            </ListItem> */}
          </List>
        </Box>
        <Box className={classes.btnWrapper}>
          <DropdownMenu
            btnClass={classes.btnClass}
            icon="edit"
            listitems={menuItems}
            menuClass={classes.menuContainer}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

ItemList.fragments = {
  site: gql`
    fragment SiteListFragment on Site {
      id
      name
      name_en
      name_th
      name_jp
      name_kr
      description
      images
      address {
        country {
          id
          name_en
          name_th
          name_jp
          name_kr
        }
        city {
          name_en
          name_th
          name_jp
          name_kr
        }
        district {
          name_en
          name_th
          name_jp
          name_kr
        }
      }
    }
  `,
};

export default ItemList;
