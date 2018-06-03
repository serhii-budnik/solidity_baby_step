import testHelper from '../testHelper.js';

var Voting = artifacts.require("Voting");

contract('Voting', function(accounts) {
  it('should set maxVotes value of 2', function() {
    return Voting.deployed().then(function(instance){
      return instance.maxVotes(); //.call(accounts[0]);
    }).then(function(maxVotes){
      assert.equal(maxVotes, 2, "2 wasn't in the contract");
    });
  });

  it('should set id value of 1', function(){
    return Voting.deployed().then(function(instance){
      console.log("instance.id", instance.id());
      return instance.id();
    }).then(function(id) {
      assert.equal(id, 1, "ID wasn't 1 in the contract")
    });
  });

  it('should add proposal to array proposals', function() {
    return Voting.deployed().then(function(instance) {
      var votingInst = instance;
      instance.addProposal("Serhii");//.call(accounts[0]);
      return votingInst;
    }).then(function(instance) {
      return instance.proposals(0);
    }).then(function(proposal) {
      // Here get first element from array Struct(name, voteCount);
      assert.equal(proposal[0], 'Serhii', 'Name is not a Serhii');
      assert.equal(proposal[1], 0, 'voteCount is not a zero');
    });
  });
});
