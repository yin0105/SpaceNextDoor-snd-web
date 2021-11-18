import React from 'react';
import {
  Modal, makeStyles, Box, IconButton, Typography, ClickAwayListener,
} from '@material-ui/core';

import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  isOpen?: boolean;
  source: string;
  toggleModal: (e:any) => void;
  handleClickAway: () => void;
}

const useStyles = makeStyles((theme) => ({
  modelContent: {
    maxWidth: '1100px',
    padding: '20px',
    borderRadius: '40px',
    backgroundColor: 'white',
    margin: '10% auto',
    minWidth: '300px',
    height: 'fit-content',
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '30px',
      height: '100vh',
    },
    [theme.breakpoints.down('md')]: {
      margin: '50vw 5px 0px 5px',
    },
  },
  modelClose: {
    direction: 'rtl',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  terms: {
    overflowY: 'scroll',
    height: '50vh',
    width: '100%',
    overflowWrap: 'break-word',
    border: '1px solid #DDD',
    padding: '10px',
    marginTop: '20px',
    fontSize: '14px',
    fontWeight: 400,
    resize: 'none',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      height: '500px',
      fontSize: '16px',
      marginTop: '20px',
    },
  },
}));

const SiteAgreementModal: React.FC<IProps> = ({
  isOpen, toggleModal, source, handleClickAway,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'SiteAgreement');

  const renderHtmlString = (htmlString: string) => (
    // eslint-disable-next-line react/no-danger
    <div className={classes.terms} dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
  return (
    <Modal open={isOpen}>
      <Box className={classes.modelContent}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            <Box className={classes.modelClose}>
              <IconButton id="closeSiteAgreementModal" onClick={toggleModal}>
                <Image name="close" />
              </IconButton>
            </Box>
            <Box className={classes.modalBody}>
              <Typography variant="h3">{t('typography2')}</Typography>
              {renderHtmlString(source)}
            </Box>
          </Box>
        </ClickAwayListener>
      </Box>
    </Modal>
  );
};

export default SiteAgreementModal;
