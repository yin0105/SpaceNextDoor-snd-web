import React, { useState } from 'react';
import {
  Box,
  makeStyles,
  Tooltip,
  Typography,
  withStyles,
  ClickAwayListener,
} from '@material-ui/core';
import { getTranslatedName } from 'utilities/market';
import { useRouter } from 'next/router';
import Image from '../../../../../components/Image';
import { capitalizeFirstLetter } from '../../../../../utilities/capitalizeFirstLetter';

interface IProps {
  item: {
    id: number;
    name_en: string;
    description_en: string;
  };
  className?: string;
  showPromoName?: boolean;
}

const useStyles = makeStyles((theme) => ({
  promotionText: {
    color: theme.palette.success.main,
    fontSize: '10px',
    display: 'flex',
    paddingBottom: '4px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    height: '27px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '12px',
    },
  },
  tooltipContainer: {
    width: '28px',
    height: '28px',
    whiteSpace: 'break-spaces',
  },
  infoIcon: {
    marginLeft: '6px',
    marginTop: '3px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  closeTooltip: {
    position: 'absolute',
    right: '3px',
    top: '2px',
    '& img': {
      width: '14px',
      height: '14px',
      cursor: 'pointer',
    },
  },
}));

const TooltipInfo: React.FC<IProps> = ({ item, className, showPromoName = false }) => {
  const { locale } = useRouter();
  const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        top: '-9px',
      },
      top: '-18px',
      color: '#333333',
      lineHeight: '18px',
      fontWeight: 400,
      fontSize: '10px',
      backgroundColor: '#ffffff',
      padding: '11px 20px 11px 16px',
      boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
      borderRadius: '5px',
    },
    arrow: {
      '&::before': {
        backgroundColor: '#ffffff',
      },
    },
  }))(Tooltip);
  const classes = useStyles();
  const [isOpenTooltip, setOpenTooltip] = useState('');

  return (
    <Box>
      <ClickAwayListener onClickAway={() => setOpenTooltip('')}>
        <Typography key={item.id} component="div" className={classes.promotionText}>
          {showPromoName && getTranslatedName(item, 'name', locale)}
          <div className={classes.tooltipContainer}>
            <CustomTooltip
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setOpenTooltip('')}
              open={isOpenTooltip === item.id.toString()}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={(
                <>
                  <div>{capitalizeFirstLetter(getTranslatedName(item, 'description', locale))}</div>
                  <div
                    tabIndex={0}
                    role="button"
                    className={classes.closeTooltip}
                    onClick={() => setOpenTooltip('')}
                  >
                    <Image name="close" />
                  </div>
                </>
              )}
            >
              <Box onClick={() => setOpenTooltip(item.id.toString())}>
                <Image className={className || classes.infoIcon} name="info" folder="DetailPage" />
              </Box>
            </CustomTooltip>
          </div>
        </Typography>
      </ClickAwayListener>
    </Box>
  );
};

export default TooltipInfo;
