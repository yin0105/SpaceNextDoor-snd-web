import { useRouter } from 'next/router';
import {
  Box,
  Breadcrumbs,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    transform: 'translateY(-6px)',

    '& .MuiLink-root': {
      fontSize: '12px',
      color: '#EA5B21',
      fontWeight: 600,
    },
  },
  typo: {
    height: 20,
    color: '#000000',
    fontSize: '12px',
  },
});

interface IItem {
  link?: string;
  title: string;
}

interface IProps {
  items: IItem[]
}

const ListingBreadcrumb: React.FC<IProps> = ({
  items,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const loader = (item) => {
    const splitTitle = item?.split('_');
    return (
      <>
        {splitTitle[1] !== 'undefined' ? item : (
          <Skeleton variant="rect" animation="wave" width={60} className={classes.typo} />
        )}
      </>
    );
  };

  const onLinkClick = (e, link) => {
    e.preventDefault();
    router.push(link);
  };

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.root}>
      {items.map((item: IItem, i: number) => (
        <div key={`${item.title}_${i}`}>
          {item.link ? (
            <Box onClick={(e) => { onLinkClick(e, item.link); }}>
              <Link href={item.link}>
                { loader(item.title) }
              </Link>
            </Box>
          ) : (
            <Typography className={classes.typo}>{ loader(item.title)}</Typography>
          )}
        </div>
      ))}
    </Breadcrumbs>
  );
};

export default ListingBreadcrumb;
