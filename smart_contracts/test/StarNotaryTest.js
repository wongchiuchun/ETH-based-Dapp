const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    describe('can create a star', () => { 
        it('can create a star and check it exists', async function () { 
            
            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 1, {from: accounts[0]})

            assert.equal(await this.contract.checkIfStarExist('123', '456', '789'), true)
        })
    })

    describe('can create a star', () => { 
        it('can create a star and get it by name', async function () { 
            
            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 1, {from: accounts[0]});

            assert.equal(await this.contract.tokenIdToStarInfo(1).then(result => {return result[0]}), 'awesome star!')
        })
    })

    describe('star uniqueness', () => { 
        it('only stars unique stars can be minted', async function() { 
            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 1, {from: accounts[0]});

            let Err;

            let Errmsg = 'Error: VM Exception while processing transaction: revert';

            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 1, {from: accounts[0]}).catch(error => {Err = error.toString()});

            assert.equal(Err, Errmsg)
            //then we try to mint the same star, and we expect an error
        })

        it('only stars unique stars can be minted even if their ID is different', async function() { 
            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 1, {from: accounts[0]});

            let Err;

            let Errmsg = 'Error: VM Exception while processing transaction: revert';
            
            await this.contract.createStar('awesome star!', 'this is an awesome star', '123', '456', '789', 2, {from: accounts[0]}).catch(error => {Err = error.toString()});

            assert.equal(Err, Errmsg)
            // first we mint our first star
            // then we try to mint the same star, and we expect an error
        })

        it('minting unique stars does not fail', async function() { 
            for(let i = 0; i < 1; i ++) { 
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await this.contract.createStar('awesome star!', "this star was bought for my wife's birthday", newRa, newDec, newMag, id, {from: accounts[1]})

                let starInfo; 
                await this.contract.tokenIdToStarInfo(id).then(result => {starInfo = result});
                assert.equal(starInfo[0], 'awesome star!')
            }
        })
    })

    describe('buying and selling stars', () => { 

        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar('awesome star!', "this star was bought for my wife's birthday", "1", "1", "1", 1, {from: accounts[1]})
        })

        it('user1 can put up their star for sale', async function () { 
            await this.contract.putStarUpForSale(1, starPrice, {from: accounts[1]});
            assert.equal(await this.contract.starsForSale(1), true)// Add your logic here
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(1, starPrice, {from: accounts[1]});
            })
    
            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(1, {from: accounts[2], value: starPrice});
                assert.equal(await this.contract.ownerOf(1), accounts[2])// Add your logic here
            })
    
            it('user2 ether balance changed correctly', async function () { 
                let balance1 = web3.eth.getBalance(accounts[2]);
                await this.contract.buyStar(1, {from: accounts[2], value: starPrice, gasPrice:0});
                let balance2 = web3.eth.getBalance(accounts[2]);
                let new1 = balance1 - balance2
                assert.equal(new1, starPrice)
            })
        })
    })   

})