const fs = require('fs')
const path = require("path")

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('RoyalMinterNFT');
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

const copyArtifacts = async () => {
    const backend_dir = path.resolve(__dirname, '..');
    const frontend_dir = path.resolve(__dirname, '../..');

    let src = backend_dir + "/artifacts/contracts"
    const dest = frontend_dir + "/frontend/src/utils"

    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      !fs.existsSync(dest) && fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(folder => {
        src = src + '/' + folder
        fs.readdirSync(src).forEach(file => {
            !file.includes('dbg') && fs.copyFileSync(
                src + '/'+ file, 
                dest + '/'+ file
            )
        })

      });
    }
    console.log("Frontend ABI updated: ", deployer.address);

}

const runMain = async () => {

    try {
        await main();
        await copyArtifacts();
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();