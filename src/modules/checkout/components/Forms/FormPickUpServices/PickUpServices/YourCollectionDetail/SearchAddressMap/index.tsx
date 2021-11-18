import { Hidden } from '@material-ui/core';
import React from 'react';
import MobileVersion from './MobileVersion';
import DesktopVersion from './DescktopVersion';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SearchAddressMap: React.FC<IProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
  } = props;
  return (
    <>
      <Hidden smUp>
        <MobileVersion isOpen={isOpen} setIsOpen={setIsOpen} />
      </Hidden>
      <Hidden xsDown>
        <DesktopVersion isOpen={isOpen} setIsOpen={setIsOpen} />
      </Hidden>
    </>
  );
};

export default SearchAddressMap;
