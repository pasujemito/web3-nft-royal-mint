
const main = async () => {

    const contractFactory = await hre.ethers.getContractFactory("RoyalMinterNFT");
    const deployContract = await contractFactory.deploy();
    await deployContract.deployed()

    console.log("Contract deployed!")
    console.log("Deployed to:", deployContract.address)

    let transaction
    transaction = await deployContract.createNFT();
    await transaction.wait();

};

const runMain = async () => {

    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

runMain();