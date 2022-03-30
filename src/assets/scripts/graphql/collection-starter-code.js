import sendQuery from './index';

export default async function getAllProducts(collectionHandle) {
  const query = `
        {
          collectionByHandle(handle: \"${collectionHandle}\") {
            products(first: 50) {
              edges {
                node {
                  id
                  handle
                  title
                  createdAt
                  options {
                    name
                    values
                  }
                  variants(first: 50) {
                    edges {
                      node {
                        id
                        price
                        compareAtPrice
                        availableForSale
                        image {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `
  const { data } = await sendQuery(query);
  if (data && data.data) {
    const products = data?.data?.collectionByHandle?.products?.edges.map(({node}) => {
      const product = {...node};
      product.variants = node.variants.edges.map(({node}) => ({...node}));
      return product;
    });
    return products;
  }
  return [];
}
