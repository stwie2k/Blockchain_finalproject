
var ECRecovery = artifacts.require("./ECRecovery.sol");
var Donation=artifacts.require("./Donation.sol");

const sigUtil = require("eth-sig-util")

var alice_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Alice"}])
var bob_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Bob"}])
var carol_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Carol"}])

module.exports = function(deployer) {
  deployer.deploy(ECRecovery);
  // deployer.deploy(Voting, ['Alice', 'Bob', 'Carol'], [alice_vote_hash, bob_vote_hash, carol_vote_hash]);
  deployer.deploy(Donation);

};
