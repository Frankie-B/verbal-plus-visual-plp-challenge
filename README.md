# V+V Code Challenge

## STORE INFO

* The password to access your store is `verbalplusvisual`.
* Link to the test collection: https://vpv-code-challenge.myshopify.com/collections/test-collection/?preview_theme_id=YOUR_THEME_ID
   * Please note the preview_theme_id query param ensures you're previewing your dev theme (replace `YOUR_THEME_ID` with the theme ID you received in your email)

## DEV OPS

The dev ops configuration for this repository should be ready to go. If you run across any issues, don't hesitate to reach out. Please follow the steps below and you should be ready to code!
1. `npm install`
  1. If you encounter any issues, try node v11
2. Update the `config.yml` file
   1. `password`: You should have received an email with your Theme Kit password
   1. `theme_id`: This should be included in the email sending this challenge
3. `npm run devdeploy`
4. `npm run watch`
   1. If `npm run watch` is updating your `\dist` properly but not updating your theme, try running `npm run themekit-watch` while `npm run watch` is running

## FILE STRUCTURE

The repository has all the templates and logic for a full Shopify build. However, you can ignore most of the templates. For this assignment, please reference the following files.

### /src/templates/collection.liquid
This is where the HTML and Liquid for this page can be updated.
If you are unfamiliar with liquid templating language, please see the documentation here: https://shopify.dev/docs/themes/liquid/reference.
While you don’t need to use liquid, it might come in handy.

### /src/assets/scripts/templates/collection.js
This is where all javascript for the assignment can live.

### /src/assets/styles/templates/collection.scss
This is where you can add styles for the collection page.

### /src/assets/scripts/graphql/collection-start-code.js
Here you can find a function we’ve provided you access product information using the Shopify store front api. You should not need to edit this file at all. If you are interested, more information about the Storefront API can be found here. 
https://shopify.dev/docs/storefront-api

## Color Hexes
For the color swatches, you can use the following color hexes for the corresponding color names.
* Blue: '#00BCD3'
* Red: '#EF5350'
* Gold: '#FEC109'
* Brown: '#AF806E'
* Medium Grey: '#CDCDCD'
* Navy: '#2F3676'
* Yellow: '#FEC109'
* Dark Wash: '#2F3676'
* Light Wash: '#00BCD3'
