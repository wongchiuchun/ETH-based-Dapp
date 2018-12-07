This is a Dapp that interacts with the Ethereum Rinkeby network to provide decentralsied Star Notary Services.

Front-end
1. Webpage - Index.html 
This is a webpage that allows you to interact with the blockchain. Please install metamask before you use it.
There are five available functions:
(i) Create a new star
(ii) Put Star Up for Sale
(iii) Buy Star
(iv) Get Star Info
(v) Get Star Owner Info

2. API-end points - server.js
There are two APIs available, one for getting the start info, the other one for getting the info of the star owner. 

Smart Contract
1. The Smart Contract source code file is contained in StarNotary.sol. Stars are being configured as ERC721 Tokens. The contract also inheret functions standard to ERC721 Tokens

Unit Test
1. The Test code of the Smart Contract is contained in the StarNotaryTest.js File


