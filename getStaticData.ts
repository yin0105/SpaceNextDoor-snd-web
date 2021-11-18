/* eslint-disable */
require('dotenv').config()
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const ENDPOINT = process.env.NEXT_PUBLIC_REACT_APP_GRAPHQL_API;

const filePath = path.join(__dirname, "./public/locations.json");
const main = async () => {
  try {
    const { data } = await axios.post(ENDPOINT, {
      query: `
        query {
          countries (pagination:{
            limit:3,
            skip:0
          }){
            edges{
              id
              name_en
              name_th
              name_jp
              name_kr
              code
              currency
              currency_sign
              cities{
                id
                name_en
                name_th
                name_jp
                name_kr
                districts{
                  id
                  name_en
                  name_th
                  name_jp
                   name_kr
                }
              }
            }
          }
        } `
    });
    fs.writeFileSync(filePath, JSON.stringify(data.data.countries.edges, null, 2));
  } catch (error) {
    throw (error)
  }
};

main().then(() => console.log("Done."));
