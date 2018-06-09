require('babel-register')({
    ignore: /node_modules\/(?!openzeppelin-solidity\/test\/helpers)/
});
require('babel-polyfill');

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 9545,
            network_id: "*", // Match any network id
            build: "webpack"
        },
        ganache: {
            host: 'localhost',
            port: 7545,
            network_id: '*'
        },
    }
};
