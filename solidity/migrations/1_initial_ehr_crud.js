const Cruds = artifacts.require("Cruds");

module.exports = function (deployer) {
    deployer.deploy(Cruds);
};