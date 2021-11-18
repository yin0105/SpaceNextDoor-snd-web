import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { inject, observer } from 'mobx-react';
import Hidden from '@material-ui/core/Hidden';

import Image from '../../../../components/Image';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from '../../stores/EstimatorBoxStore';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '72px',
      boxShadow: 'none',
    },
    boxShadow: '0px 10px 80px #e9e9e9',
    backgroundColor: '#FFFFFF',
    backdropFilter: 'blur(40px)',
    borderBottom: '2px solid #f5f5f5',
    boxSizing: 'border-box',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
}));

const StickyHeader: React.FC<IProps> = ({
  estimatorBoxStore: {
    incrementCurrentStep,
  },
}) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar className={classes.root} color="inherit" position="fixed">
        <Toolbar>
          <Hidden smUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={() => incrementCurrentStep(-1)}
            >
              <Image name="back-arrow" />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(StickyHeader));
