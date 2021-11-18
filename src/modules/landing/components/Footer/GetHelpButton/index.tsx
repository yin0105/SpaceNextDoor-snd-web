import { Box, Button, makeStyles } from '@material-ui/core';

import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import Image from '../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: '50px',
    top: 'calc(100vh - 90px)',
    backgroundColor: '#FF9056',
    borderRadius: '20px',
  },
  button: {
    padding: '13px 20px 13px 60px',
    borderRadius: '20px',
    textTransform: 'none',
  },
  boxImage: {
    position: 'absolute',
    top: '8px',
    left: '20px',
  },
  buttonText: {
    fontWeight: 700,
  },
}));

const GetHelpButton = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* <Box className={classes.boxImage}>
        <Image name="getHelp" folder="LoginPage" />
      </Box>
      <Button className={classes.button}>
        <WhiteTypography variant="h4" className={classes.buttonText}>
          Get help
        </WhiteTypography>
      </Button> */}
    </Box>
  );
};

export default GetHelpButton;
