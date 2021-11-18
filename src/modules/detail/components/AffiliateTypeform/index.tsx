import React from 'react';
import { Widget } from '@typeform/embed-react';
import { Dialog, makeStyles } from '@material-ui/core';
import { useStyles } from 'components/Buttons';
import { AFFLIATE_TYPEFORM_ID_EN, AFFLIATE_TYPEFORM_ID_JP } from 'config';
import { useRouter } from 'next/router';
import Image from 'components/Image';

const useMaterialStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    zIndex: 10000,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: '10px',
    },
  },
}));

interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void
}

const AffiliateTypeform: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  const styles = useMaterialStyles();
  const router = useRouter();

  const getTypeFormId = () => {
    switch (router.locale) {
      case 'en-US':
        return AFFLIATE_TYPEFORM_ID_EN;
      case 'ja':
        return AFFLIATE_TYPEFORM_ID_JP;
      default:
        return AFFLIATE_TYPEFORM_ID_EN;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{ zIndex: 100000002, background: 'rgba(0, 0, 0, 0.5)' }}
      classes={{
        paperWidthSm: classes.paperWidthSm,
        paperScrollPaper: classes.paperScrollPaper,
      }}
    >
      <Image onClick={() => setIsOpen(false)} folder="CheckoutPage" name="close" className={styles.image} />
      <Widget
        id={getTypeFormId()}
        style={{ position: 'inherit', height: '100%', paddingTop: '35px' }}
      />
    </Dialog>
  );
};

export default AffiliateTypeform;
