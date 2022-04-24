const fs = require('fs')
const path = require("path")

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('RoyalMinterNFT');
    const deployContract = await contractFactory.deploy();
    await deployContract.deployed()
    console.log("Contract deployed to:", deployContract.address)

    // let transaction;
    // transaction = await deployContract.createNFT();
    // await transaction.wait();
    // console.log("New Royal NFT #1 minted.")

}

const copyArtifacts = async () => {
    const backend_dir = path.resolve(__dirname, '..');
    const frontend_dir = path.resolve(__dirname, '../..');

    const source = backend_dir + "/artifacts/contracts"
    const dest = frontend_dir + "/frontend/src/utils"

    !fs.existsSync(dest) && fs.mkdirSync(dest);

    const getFilesRecursively = (source) => {
        const filesInDirectory = fs.readdirSync(source);
        for (const file of filesInDirectory) {
          const absolute = path.join(source, file);
          if (fs.statSync(absolute).isDirectory()) {
              getFilesRecursively(absolute);
          } else {

              if (!file.includes('dbg')) {
                fs.copyFileSync(
                    absolute, 
                    dest + '/'+ file
                )
              }
          }
        }
      };
    getFilesRecursively(source)

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