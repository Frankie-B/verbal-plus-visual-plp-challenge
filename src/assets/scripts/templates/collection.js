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
    }, []);

    console.log(products);

    const collection = products.map((product, index) => {

        const variants = product.variants.map((variant, index) => {
            if (index % 4 === 0) return variant;
        });

        const title = product.title;

        const Blue = '#00BCD3'
        const red = '#EF5350'
        const gold = '#FEC109'
        const brown = '#AF806E'
        const mediumGrey = '#CDCDCD'
        const navy = '#2F3676'
        const yellow = '#FEC109'
        const darkWash = '#2F3676'
        const lightWash = '#00BCD3'

        const colorOptions = product.options.map((option, index) => {
            if (option.name === 'Color') {
                //
            }
        })
        // console.log(colorOptions)

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