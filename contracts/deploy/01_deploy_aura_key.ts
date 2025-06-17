import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { getNamedAccounts, deployments } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	if (!deployer) {
		throw new Error("Missing named accounts");
	}

	await deploy("AuraKey", {
		contract: "AuraKey",
		from: deployer,
		args: ["0xcCcCCccC00000001000000000000000000000000", 10000000000000], // Optional: Use if your smart contract requires arguments
		log: true,
	});
};

func.tags = ["AuraKey"];

export default func;
