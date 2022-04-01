# self documentation

## Challenge - getting devOps up and running for theme preview

- Getting dev prview to work tooka little more effort than I expected:
  - ISSUE: npm breaking on installation of dependancies
    - Solution: Using nvm downgrade to node version 11.15.0
  - ISSUE: `npm ERR! Error: EACCES: permission denied` -> the problem seemed to be with the node-sass dependancy PATH
    - Solution:  Taking ownership of the folder that Node was installed to with:
  
    ```bash $ sudo chown -R [myusername]:[myusername] /home/[myusername]/.nvm`


