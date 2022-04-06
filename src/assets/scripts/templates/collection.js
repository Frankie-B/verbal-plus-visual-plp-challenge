import React, { useEffect, useState } from "react";
import getAllProducts from '../graphql/collection-starter-code';
import '../theme';

const Collection = () => {
  const [products, setProducts] = useState([]);
  /* Resolve the getAllProducts function in a hook, useEffect is good for this, to avoid a scenario of the page infinitely
  rendering/calling the function */
  useEffect(() => {
    let mounted = true

    /** Async function to retrieve the data from the getAllProducts Fn and return its value */
   async function fetchProducts() {
     try {
       const result = await getAllProducts('test-collection');
       if (mounted) setProducts(result);
     } catch (error) {
       console.error(`Something went wrong: ${err}`) // please, please, properly handle this error in React :)
     }
   }
   fetchProducts();
   return () => {
     mounted = false;
   }
  }, [])


  const collection = products
    .filter(product => product.handle === 'short-sleeve-t-shirt') // filter for only the t-shirts
    .flatMap(product => product.variants.map(variant => [variant, variant.image.src, variant.price])); // flatten to one level

  console.log(collection, typeof (collection));

  const productCard = collection.map((product, index) => {
    const imageUrl = product[1];
    // const price = product[2].toFixed(2);
    return (
      <div className="product_container" key={index}>
        <div className="image_container">
           <img src={imageUrl} alt="" />
        </div>
        <div className="details_container">

        </div>
      </div>
    )
   } )

  return (
    <div className="Collection">
      {productCard}
    </div>
  );
}

export default Collection;