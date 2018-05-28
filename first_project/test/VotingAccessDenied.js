const expectThrow = async promise => {
  try {
      await promise;
  } catch (error) {
      // TODO: Check jump destination to destinguish between a throw
      //       and an actual invalid jump.
      const invalidOpcode = error.message.search('invalid opcode') >= 0;
      // TODO: When we contract A calls contract B, and B throws, instead
      //       of an 'invalid jump', we get an 'out of gas' error. How do
      //       we distinguish this from an actual out of gas event? (The
      //       ganache log actually show an 'invalid jump' event.)
      const outOfGas = error.message.search('out of gas') >= 0;
      const revert = error.message.search('revert') >= 0;
      assert(
      invalidOpcode || outOfGas || revert,
      'Expected throw, got \'' + error + '\' instead',
      );
      return;
  }
  assert.fail('Expected throw not received');
  };
    
  
  
// import expectThrow from '../node_modules/openzeppelin-solidity/test/helpers/expectThrow.js';
// const expectThrow = require("../node_modules/openzeppelin-solidity/test/helpers/expectThrow.js");

var Voting = artifacts.require("Voting");

contract('Voting', function(accounts) {
  describe("when account don't have access to specific methods", function() {
    describe("addProposal", function() {
      describe("when another account want add proposal", function(){
        it('should raise exception', async() => {
          let instance = await Voting.deployed();
          await expectThrow(instance.addProposal('test', { from: accounts[1] }));
        });
      })
    });

    describe('#giveRightToVote', function(){
      describe('when try add right to vote', function() {
        it('should raise exception', async() => {
          let instance = await Voting.deployed();
          await expectThrow(
            instance.giveRightToVote(accounts[0], { from: accounts[1] })
          );
        });
      });

      describe('when voting is finished', function(){
        it('should raise exception', async() => {
          let instance = await Voting.deployed();
          await instance.completeVoting();
          await expectThrow(instance.giveRightToVote(accounts[1]));
        });
      });

      describe('when voter already voted', function(){
        it('should raise exception', async() => {
          let instance = await Voting.deployed();
          let owner = await instance.owner();
          console.log(owner);
          console.log(accounts[0]);
          await instance.giveRightToVote(accounts[1], { from: accounts[0] });
          // await instance.addProposal("First Proposal");
          // await instance.vote(0, { from: accounts[0] });
          // await expectThrow(instance.vote(0, { from: accounts[0] }));
        });
      });
    });

    describe("#vote", function(){
      describe('when try vote without permissions', function() {
        it('should raise exception', async() => {
          let instance = await Voting.deployed();
          await expectThrow(instance.vote(0));
        });
      });
    });
  });
});