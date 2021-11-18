import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Image from '../../../../../components/Image';
import toCamelCase from '../../../../../utilities/toCamelCase';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '38px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    '& :first-child': {
      height: '25px',
    },
  },
  itemname: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
  },
  status: {
    fontSize: '12px',
    lineHeight: '20px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  container: {
    maxWidth: '366px',
    height: '50px',
    border: '1.28947px solid #E9E9E9',
    borderRadius: '15.4737px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
  },
}));

interface IProps {
  name: string;
  title?: string;
  status: string;
  icon?: boolean;
  handleEdit?: (e: React.SyntheticEvent) => void;
}

const ListItem: React.FC<IProps> = ({
  name, title, status, icon, handleEdit,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="body2" className={classes.title}>
        {title}
      </Typography>
      <Box component="div" className={classes.container} mb={4} mt={4}>
        <Box component="div" className={classes.icon}>
          {icon && (
            <Box component="span">
              <Image name="Master" folder="Payments" />
            </Box>
          )}
          <Box id={`${toCamelCase(title || 'accountNumber').replace('-', '')}Display`} component="span" className={classes.itemname}>{name}</Box>
        </Box>
        <Box
          component="div"
          className={classes.status}
          hidden={!handleEdit}
          onClick={(e) => {
            if (handleEdit) {
              handleEdit(e);
            }
          }}
        >
          {status}
        </Box>
      </Box>
    </>
  );
};

export default ListItem;
