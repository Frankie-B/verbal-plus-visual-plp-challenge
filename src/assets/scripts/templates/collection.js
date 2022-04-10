import React, {useEffect, useState} from "react";
import '../../styles/templates/collection.scss';
import getAllProducts from '../graphql/collection-starter-code';
import '../theme';
import {unique} from "webpack-merge";

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
                console.error(`Something went wrong: ${err}`) // please, please, properly handle this error in React :)
            }
        }

        fetchProducts();

        return () => {
            mounted = false;
        }
    }, []);

    const collection = products.map((product, index) => {
                const blue = '#00BCD3', red = '#EF5350', gold = '#FEC109',
                    brown = '#AF806E', mediumGrey = '#CDCDCD', navy = '#2F3676',
                    yellow = '#FEC109', darkWash = '#2F3676', lightWash = '#00BCD3';

                const title = product.title;

                /** The returned data contained duplicates, using Set,
                 * filter out duplicates to remain with
                 * only unique varaints
                 * **/
                const found = new Set();

                const variants = product.variants.filter((el, index, self) => {
                    const isDuplicate = found.has(el.image.src);
                    found.add(el.image.src);
                    return !isDuplicate;
                });


                console.log(variants)



                return (
                    <div className="product_card " key={index}>
                        <div className="product column">
                            <div className="img_container">
                                {/*<img src={uniqueVariants[0].image.src} alt="" className="product_img"/>*/}
                            </div>
                            <div className="details_container column">
                                <h3 className="product_title">{title}</h3>
                                {/*<p className="price">{uniqueVariants[0].price}</p>*/}
                                <div className="color_container row">
                                    {/*{colorBtn}*/}
                                </div>
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