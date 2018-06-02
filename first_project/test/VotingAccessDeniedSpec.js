import Reverter from './scripts/reverter.js';
import expectThrow from '../node_modules/openzeppelin-solidity/test/helpers/expectThrow.js';

beforeEach(function () {
  Reverter.snapshot();
});

afterEach(function () {
  Reverter.revert();
});

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
          var instance = await Voting.deployed();
          let owner = await instance.owner();

          await instance.giveRightToVote(accounts[0], { from: accounts[0] });

          await instance.addProposal("First Proposal");
          await instance.vote(0, { from: accounts[0] });
          await expectThrow(instance.vote(0, { from: accounts[0] }));
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

      // describe('when you have permission but voting already finished', function(){
        // it('should raise exception', async() => {
          // let instance = await Voting.deployed();
          // await instance.giveRightToVote(accounts[0], { from: accounts[0] });
          // await instance.addProposal("First Proposal");
          // await instance.completeVoting();
          // await expectThrow(instance.vote(0));
        // });
      // });
    });
  });
});