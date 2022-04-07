import React, { useEffect, useState } from "react";
import '../../styles/templates/collection.scss';
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


  // create an array of all the t-shirts
  const collection = products
    .filter(product => product.handle === 'short-sleeve-t-shirt') // filter for only the t-shirts
    .flatMap(product => product.variants.map(variant => [variant, variant.image.src, variant.price]));


  const itemExists = new Set();
  const uniqueProducts = collection.filter(el => {
    const duplicate = itemExists.has(el[1]);

    itemExists.add(el[1]);
    return !duplicate;
  });

  console.log(uniqueProducts);

  const productCard = uniqueProducts.map((product, index) => {
    const imageUrl = product[1];
    const productPrice = product[2];
    return (
       <div className="product_container column">
          <div className="image_container">
            <img className="product_image" src={imageUrl} alt="T-shirt" />
          </div>
          <div className="details_container column">
            <h3 className="product_title">Short sleeve T-shirt</h3>
            <p className="price_copy"><span>${productPrice}</span></p>
          <div className="swatch_container row">
            <span className="color red"></span>
            <span className="color navy"></span>
            <span className="color teal"></span>
            <span className="color grey"></span>
            <span className="color yellow"></span>
            <span className="color brown"></span>
              {/* <div className="swatch_item">red</div>
              <div className="swatch_item">blue</div>
              <div className="swatch_item">yellow</div> */}
            </div>
            </div>
        </div>
      )
   })

  return (
    <div className="Collection">
      <div className="wrapper row">
       {productCard}
    </div>
    </div>
  );
}

export default Collection;