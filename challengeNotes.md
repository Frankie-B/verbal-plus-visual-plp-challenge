# self documentation

## Challenge - getting devOps up and running for theme preview

- Getting dev prview to work tooka little more effort than I expected:
  - ISSUE: npm breaking on installation of dependancies
    - Solution: Using nvm downgrade to node version 11.15.0
  - ISSUE: `npm ERR! Error: EACCES: permission denied` -> the problem seemed to be with the node-sass dependancy PATH
    - Solution:  Taking ownership of the folder that Node was installed to with:
  
    ```bash $ sudo chown -R [myusername]:[myusername] /home/[myusername]/.nvm`
  - 
  
    a. Product Image - done
    b. Product Title - done
    c. Variant Price - done
  
    d. Product Swatches
    i. The product card should display a swatch for each color option
    ii. When a user clicks on a swatch, that product card should
    dynamically update:
1. The image associated with that variant
2. The selected swatch
   iii. The product card should default to displaying the information for the first variant returned for that specific product data. 




