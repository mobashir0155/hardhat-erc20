import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { ATCToken } from "../typechain-types"
import { deployments, ethers } from "hardhat"
import { assert } from "chai"
import { INITIAL_SUPPLY } from "../helper-hardhat-config"

describe("ATC toekn unit test", () => {

    let deployer: SignerWithAddress, user: SignerWithAddress, atcToken: ATCToken
    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user = accounts[1]

        await deployments.fixture('all')
        const contractAddress = (await deployments.get("ATCToken")).address
        atcToken = await ethers.getContractAt("ATCToken", contractAddress)
    })

    it("Should have correct INITIAL_SUPPLY of token", async () => {
        const totalSupply = await atcToken.totalSupply()
        assert.equal(totalSupply.toString(), INITIAL_SUPPLY)
    })

    it("Should be able to transfer tokens successfully to an address", async () => {
        const tokenToSend = ethers.parseEther("10")
        await atcToken.transfer(user.address, tokenToSend)
        const balanceAfter = await atcToken.balanceOf(user.address)
        assert.equal(balanceAfter, tokenToSend)
    })

    it("Should approve other address to spend token", async () => {
        const tokenToSpend = ethers.parseEther("5")
        await atcToken.approve(user.address, tokenToSpend)
        const recieverContract = atcToken.connect(user)

        await recieverContract.transferFrom(deployer.address, user.address, tokenToSpend)
        const balanceAfter = await atcToken.balanceOf(user.address)
        assert.equal(balanceAfter, tokenToSpend)
    })
})