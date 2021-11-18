import { Box } from '@material-ui/core';
import React from 'react';
import Header from '../modules/landing/components/Header';
import Main from '../modules/landing/components/Main';
import Footer from '../modules/landing/components/Footer';

const Login: React.FunctionComponent = () => (
  <Box>
    <Header />
    <Main />
    <Footer />
  </Box>
);

export default Login;
