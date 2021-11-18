import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Box } from '@material-ui/core';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginBottom: '14px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '44px',
    },
  },
  textTitle: {
    lineHeight: '2.3rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
      lineHeight: '4rem',
    },
  },
  textValue: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '2.3rem',
    textAlign: 'end',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
      lineHeight: '4rem',
    },
  },
}));

interface IProperty {
  title: string | JSX.Element;
  value: string;
}

interface IProps {
  data:IProperty[];
}

const Info:React.FC<IProps> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
      {data.map((item, i) => {
        const { title } = item;
        let autoRenewalVerification = true;
        if (title === 'Auto-renewal' && item.value === '') {
          autoRenewalVerification = false;
        }

        return autoRenewalVerification
          ? (
            <Box key={typeof item.title !== 'string' ? `image${i}` : item.title} display="flex" justifyContent="space-between">
              <Box>
                <Grey3Typography variant="body2" className={classes.textTitle}>
                  {item.title}
                </Grey3Typography>
              </Box>
              <Box width="50%">
                <Grey3Typography variant="body2" className={classes.textValue}>
                  {item.value}
                </Grey3Typography>
              </Box>
            </Box>
          )
          : '';
      })}
    </Box>
  );
};

export default Info;
