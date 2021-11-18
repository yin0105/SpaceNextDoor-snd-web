import { useRouter } from 'next/router';
import usePageTranslation from 'hooks/usePageTranslation';
import {
  Box,
  Breadcrumbs,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({

  breadCrumb: {
    padding: '10px 0px 40px 0px',
    listStyle: 'none',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '22px',
    '& a': {
      color: '#00A0E3',
      textDecoration: 'none',
    },
  },
  typo: {
    height: 20,
    color: '#000000',
    fontSize: '12px',
  },
}));

interface IItem {
  link?: string;
  title: string;
}

interface IProps {
  items: IItem[]
}

const PlacesBreadcrumb: React.FC<IProps> = ({
  items,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('search', 'SelectPlaces');
  const onLinkClick = (e, link) => {
    e.preventDefault();
    router.push(link);
  };

  const transleTtitle = (title) => {
    if (title.includes('Home')) {
      return t('NavHome');
    }
    if (title.includes('Conditions')) {
      return t('NavPlaces');
    }
    if (title.includes('Search Results')) {
      return t('NavSearch');
    }
    return '';
  };

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.breadCrumb}>
      {items.map((item: IItem, i: number) => (
        <div key={`${item.title}_${i}`}>
          {item.link ? (
            <Box onClick={(e) => { onLinkClick(e, item.link); }}>
              <Link href={item.link}>
                {transleTtitle(item.title)}
              </Link>
            </Box>
          ) : (
            <Typography className={classes.typo}>{item.title}</Typography>
          )}
        </div>
      ))}
    </Breadcrumbs>
  );
};

export default PlacesBreadcrumb;
