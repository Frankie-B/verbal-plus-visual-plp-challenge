import '../../styles/templates/collection.scss';
import '../theme';

import React, { useEffect, useState } from "react";

import getAllProducts from '../graphql/collection-starter-code';

const Collection = () => {
    const [products, setProducts] = useState([]);

    /** : Resolve the getAllProducts function in a hook, useEffect is good for this, to avoid a scenario of
     * the page infinitely rendering/calling the function
     * **/
    useEffect(() => {
        let mounted = true

        /** : Async function to retrieve the data from the getAllProducts Fn and return its value **/
        async function fetchProducts() {
            try {
                const result = await getAllProducts('test-collection');
                if (mounted) setProducts(result);
            } catch (error) {
                console.error(`Something went wrong: ${err}`);
            }
        }

        fetchProducts();

        return () => {
            mounted = false;
        }
    }, []);

    const collection = products.map((product, index) => {


                const title = product.title;

                /** The returned data contained duplicates, using Set,
                 * filter out duplicates to remain with
                 * only unique items
                 * **/

                const found = new Set();
                const uniqueProduct = product.variants.filter((el) => {
                    const isDuplicate = found.has(el.image.src);
                    found.add(el.image.src);
                    return !isDuplicate;
                });


                /**
                 * create a component for default(first image in product list) image
                 * */

                const defaultProductImg = uniqueProduct.map((el, index) => {
                    if (index === 0) {
                        let defaultImage = el.image.src
                        return (
                            <img className="product_img" src={defaultImage} alt="product image" key={el.id}/>
                        )
                    }
                })

                const colorOptions = product.options.map((option) => {
                    if (option.name === 'Color') {
                        return option.values
                    }
                });

                const colors = colorOptions.filter((option) => {
                    if (option !== undefined) return option;
                })

                console.log(colors)


                return (
                    <div className="product_card" key={index}>
                        <div className="product row">
                            {defaultProductImg}
                        </div>
                        <div className="details_container">
                            <h3 className="product_title">{title}</h3>
                            <p className="price">{uniqueProduct[0].price}</p>
                            <div className="color_container row">
                            </div>
                        </div>
                    </div>
                )
            }
        )
    ;

    return (
        <div className="Collection">
            {collection}
        </div>
    );
}

export default Collection;