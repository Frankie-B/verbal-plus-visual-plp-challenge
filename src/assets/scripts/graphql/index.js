import axios from "axios";

const accessToken = '73fc926ae20d398bf627f7376fbf89f1';
const store = document.firstElementChild.dataset.shop;
const locale = document.firstElementChild.lang;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': accessToken,
  'Accept': 'application/json',
  'Accept-Language': locale,
};

const sendQuery = (query, variables = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  });

  return axios({
    headers,
    method: 'post',
    data: body,
    url: `https://${store}.myshopify.com/api/2022-01/graphql`,
  })
}

export default sendQuery;
