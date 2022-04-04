import React, { useEffect, useState } from "react";
import getAllProducts from '../graphql/collection-starter-code';
import '../theme';


const Collection = () => {

  /** Since I am trying to retrieve data from an asynchronous function, using the componentDidMount hook would
   * create an infinite render loop when the function is call. Instead I am choosing to use the useEffect hook, to only
   * re-render if specific data changes.
   */

  const [products, setProducts] = useState();

   useEffect(() => {
    getAllProducts('test-collection')
      .then(data => {
        setProducts(data)
      }).catch(err => {
         console.log(err)
       })
  }, [])

  console.log(products)

  return (
    <div className="Collection">Products will go here</div>
  )
}

export default Collection;