require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'products@dev',
      url: process.env.REACT_APP_GRAPHQL_API,
      headers: {},
      skipSSLValidation: true,
    },
  },
};