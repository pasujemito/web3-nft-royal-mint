require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/" + process.env.ALCHEMY_TOKEN,
      accounts: [process.env.RINKEBY_ACCOUNT_KEY]
    }
  }
};