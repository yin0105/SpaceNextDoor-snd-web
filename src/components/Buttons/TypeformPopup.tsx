import { Dialog } from '@material-ui/core';
import Image from 'components/Image';
import SingaporeEnquiry from 'pages/enquiry/singapore';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { useStyles } from './TypeformPopup.styles';

type ITypeformPopupProps = {
  label: string;
};

export const TypeformPopup: React.FC<ITypeformPopupProps> = ({ label }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton
        className={classes.root}
        onClick={() => { setIsOpen(true); }}
      >
        {label}
      </PrimaryButton>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        style={{ zIndex: 100000002, background: 'rgba(0, 0, 0, 0.5)' }}
        classes={{
          paperWidthSm: classes.paperWidthSm,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        <SingaporeEnquiry />
        <Image className={classes.close} onClick={() => setIsOpen(false)} name="close" />
      </Dialog>
    </>
  );
};
