
const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('PasujemitoNFT');
    const deployContract = await contractFactory.deploy();
    await deployContract.deployed()
    console.log("Contract deployed to:", deployContract.address)

    let transaction;
    transaction = await deployContract.createNFT();
    await transaction.wait();
    console.log("Minted NFT #1")

    transaction = await deployContract.createNFT();
    await transaction.wait();
    console.log("Minted NFT #2")

    transaction = await deployContract.createNFT();
    await transaction.wait();
    console.log("Minted NFT #3")

    transaction = await deployContract.createNFT();
    await transaction.wait();
    console.log("Minted NFT #4")

    transaction = await deployContract.createNFT();
    await transaction.wait();
    console.log("Minted NFT #5")

}

const runMain = async () => {

    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();