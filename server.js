const Hapi = require('hapi');
const Web3 = require('web3');

const provider = "infura link"
const web3 = new Web3(provider);

// The interface definition for your smart contract (the ABI) 
var abi = [
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "interfaceId",
                        "type": "bytes4"
                        }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                        "name": "",
                        "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                        "name": "",
                        "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "owner",
                        "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "approved",
                        "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_data",
                        "type": "bytes"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "name": "operator",
                        "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "approved",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "operator",
                        "type": "address"
                        },
                        {
                        "indexed": false,
                        "name": "approved",
                        "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_name",
                        "type": "string"
                        },
                        {
                        "name": "_starStory",
                        "type": "string"
                        },
                        {
                        "name": "_ra",
                        "type": "string"
                        },
                        {
                        "name": "_dec",
                        "type": "string"
                        },
                        {
                        "name": "_mag",
                        "type": "string"
                        },
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "createStar",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_price",
                        "type": "uint256"
                        }
                    ],
                    "name": "putStarUpForSale",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "buyStar",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "_ra",
                        "type": "string"
                        },
                        {
                        "name": "_dec",
                        "type": "string"
                        },
                        {
                        "name": "_mag",
                        "type": "string"
                        }
                    ],
                    "name": "checkIfStarExist",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "tokenIdToStarInfo",
                    "outputs": [
                        {
                        "name": "",
                        "type": "string"
                        },
                        {
                        "name": "",
                        "type": "string"
                        },
                        {
                        "name": "",
                        "type": "string"
                        },
                        {
                        "name": "",
                        "type": "string"
                        },
                        {
                        "name": "",
                        "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "starsForSale",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    }
                ];

var contractAddress = '0x529E6Ab9ca866b0C02FE899f9EE85593D50dF08E';

var starNotary = new web3.eth.Contract(abi, contractAddress);

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});
//
server.route({
    method: 'GET',
    path: '/star/{starTokenId}',
    handler: async (request, h) => {
        let info;
        await starNotary.methods.tokenIdToStarInfo(request.params.starTokenId).call((err, result) => { info = result;
            console.log(result);})
        let output = [];
        let i = 0;
        while (i<Object.keys(info).length){
            output.push(info[i]);
            i++;
        }
        return output;
    }
});

server.route({
    method: 'GET',
    path: '/starowner/{starTokenId}',
    handler: async (request, h) => {
        let owner;
        await starNotary.methods.ownerOf(request.params.starTokenId).call((err, result) => { owner = result;
            console.log(result);})
        return owner;
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();