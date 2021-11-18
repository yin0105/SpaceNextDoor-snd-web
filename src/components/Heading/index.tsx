import {
  Typography,
  Divider,
  makeStyles,
  Box,
  Theme,
} from '@material-ui/core';
import Select from '../Select';
import BreadCrumb from '../Breadcrumb';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    paddingBottom: '22px',
    paddingTop: '29px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px',
    },
  },
  subtitle: {
    paddingTop: 13,
    paddingBottom: 17,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: '35px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '30px',
      fontWeight: 600,
      paddingTop: '22px',
      paddingBottom: '20px',
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectWrapper: {
    alignSelf: 'center',
    display: 'none',
  },
}));

interface IHeadingProps {
  title: string;
  subTitle?: string;
  breadcrumbProps?: any;
  showFilter?: boolean;
  isLinkBreak?: boolean;
}

const Heading: React.FC<IHeadingProps> = ({
  title,
  subTitle,
  breadcrumbProps,
  showFilter,
  isLinkBreak,
}: IHeadingProps) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      {breadcrumbProps && <BreadCrumb {...breadcrumbProps} />}
      {
        isLinkBreak && (
          <Divider />
        )
      }
      {
        subTitle && (
          <>
            <Divider />
            <Box className={classes.box}>
              <Typography variant="h4" className={classes.subtitle}>
                {subTitle}
              </Typography>
              {showFilter && (
                <div className={classes.selectWrapper}>
                  <Select value="asc" handleChange={(e) => console.log(e)} />
                </div>
              )}
            </Box>
            <Divider />
          </>
        )
      }
    </>
  );
};

export default Heading;
