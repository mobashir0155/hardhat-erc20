import { HardhatRuntimeEnvironment } from "hardhat/types"
import { INITIAL_SUPPLY, developmentChains, networkConfig } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployERC20 = async (hre: HardhatRuntimeEnvironment) => {

    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const atcDeploy = await deploy("ATCToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1
    })
    log(`ourToken deployed at ${atcDeploy.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(atcDeploy.address, [INITIAL_SUPPLY])
    }
}
export default deployERC20
deployERC20.tags = ["all"]