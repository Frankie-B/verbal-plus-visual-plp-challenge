import React from 'react';
import getAllProducts from '../graphql/collection-starter-code';
import '../theme';


const Collection = () => {

  // TODO: Get products from getAllProducts funciton
  console.log(getAllProducts);

  return (
    <div className="Collection">This is a test!!</div>
  )
}

export default Collection;