var HelloEthSalon = artifacts.require("./HelloEthSalon.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloEthSalon, "stz");
};


// to get value 

// HelloEthSalon.deployed().then(function(instance) { return instance.stg()}).then(function(result){ console.log(result);});