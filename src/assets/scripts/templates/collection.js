import React, {useEffect, useState} from "react";
import '../../styles/templates/collection.scss';
import getAllProducts from '../graphql/collection-starter-code';
import '../theme';
import {unique} from "webpack-merge";

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

    // console.log(products);

    // create an array of all the prod
    // const collection = products
    //     .filter(product => product.title !== null) // filter for only the t-shirts
    //     .flatMap(product => product.variants.map(variant => [variant, variant.image.src, variant.price]));

    /* Create an aray of unique products from the collecion*/
    // const itemExists = new Set();
    // const uniqueProducts = products.filter(el => {
    //     const duplicate = itemExists.has(el.variants.image);
    //
    //     itemExists.add(el.variants.image);
    //     return !duplicate;
    // });

    console.log(products);

    const collection = products.map((product, index) => {
        const variants = product.variants.map((variant, index) => {
            if (index % 4 === 0) return variant;
        });

        const title = product.title;

        // console.log(title);
        // console.log(product.options[0].values);

        // const colorOptions = product.options[0].name;

        const colorOptions = product.options.map((option,index) => {
            if (option.name === 'Color') {
                console.log(option)
            }
        })

        console.log(colorOptions)

        return (
            <div className="product_card column" key={index}>
                <div className="product">
                    <div className="img_container">
                        <img src={variants[0].image.src} alt="" className="product_img"/>
                    </div>
                    <div className="details_container column">
                        <h3 className="product_title">{title}</h3>
                        <p className="price">{variants[0].price}</p>
                        <div className="color_container row">
                            <span className="color"></span>
                            <span className="color"></span>
                            <span className="color"></span>
                            <span className="color"></span>
                            <span className="color"></span>
                            <span className="color"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="Collection">
            {collection}
        </div>
    );
}

export default Collection;