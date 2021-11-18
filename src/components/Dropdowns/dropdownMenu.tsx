import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Menu, MenuProps, MenuItem, Divider, Box,
} from '@material-ui/core/';
import Image from '../Image';
import useStyles from './styles';
import MenuListItem from './dropdownMenuItem';

const StyledMenu = withStyles({
  paper: {
    background: '#FFFFFF',
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    boxSizing: 'border-box',
    borderRadius: '5.9px',
    width: '217px',
    border: 'none',
    marginTop: '13px',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    onBackdropClick={(e) => e.stopPropagation()}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

interface IListItem {
  name: string;
  imageName: string;
  imageFolder: string;
  divider?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
}

interface IProps {
  btnTitle?: string;
  icon?: string;
  btnClass?: string;
  menuClass?: string;
  listitems?: IListItem[];
}

const DropdownMenu: React.FunctionComponent<IProps> = ({
  btnTitle,
  icon,
  btnClass,
  listitems,
  menuClass,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles({ className: menuClass });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        id="myProfileButton"
        className={`${classes.button} ${btnClass}`}
        endIcon={icon && <Image name={icon} folder="Host" />}
      >
        {btnTitle || ''}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={menuClass}
      >
        {listitems.map((item: IListItem, i) => (
          <Box key={i}>
            <StyledMenuItem
              className={classes.listitems}
              onClick={(e) => {
                if (item.onClick) {
                  item.onClick(e);
                }
                handleClose();
              }}
            >
              <MenuListItem
                itemTitle={item.name}
                imageName={item.imageName}
                imageFolderName={item.imageFolder}
              />
            </StyledMenuItem>
            {item.divider && <Divider className={classes.divider} />}
          </Box>
        ))}
      </StyledMenu>
    </div>
  );
};

export default DropdownMenu;
