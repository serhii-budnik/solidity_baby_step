import testHelper from "../testHelper.js";
import expectThrow from "../../node_modules/openzeppelin-solidity/test/helpers/expectThrow.js";
import asserts from '../helpers/asserts.js';


var Voting = artifacts.require("Voting");

contract("Voting", function(accounts) {

  describe("when account don't have access to specific methods", function() {

    describe("#addProposal", function() {
      describe("when another account want add proposal", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await expectThrow(instance.addProposal("test", { from: accounts[1] }));
        });
      })

      describe("when voting finished", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.completeVoting();

          await expectThrow(instance.addProposal("Name"));
        });
      });

      describe("when name is blank", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await expectThrow(instance.addProposal(""));
        });
      });

      describe("when name is not unique", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.addProposal("Name");
          await expectThrow(instance.addProposal("Name"));
        });
      });
    });

    describe("#giveRightToVote", function(){
      describe("when user isn't the owner but wants add right to vote", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await expectThrow(
            instance.giveRightToVote(accounts[0], { from: accounts[1] })
          );
        });
      });

      describe("when voting is finished", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.completeVoting();
          await expectThrow(instance.giveRightToVote(accounts[1]));
        });
      });

      describe("when voter already voted", function(){
        it("should raise exception", async() => {
          var instance = await Voting.deployed();
          let owner = await instance.owner();

          await instance.giveRightToVote(accounts[0], { from: accounts[0] });

          await instance.addProposal("First Proposal");
          await instance.vote(0, { from: accounts[0] });
          await expectThrow(instance.vote(0, { from: accounts[0] }));
        });
      });

      describe("when already have rights to vote", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();

          await instance.giveRightToVote(accounts[0]);
          await expectThrow(instance.giveRightToVote(accounts[0]));
        });
      });
    });

    describe("#vote", function(){
      describe("when try vote without permissions", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await expectThrow(instance.vote(0));
        });
      });

      describe(
        "when you have permission but voting already finished",
        function()
      {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.giveRightToVote(accounts[0], { from: accounts[0] });
          await instance.addProposal("First Proposal");
          await instance.completeVoting();
          await expectThrow(instance.vote(0));
        });
      });

      describe("when voting already finished", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.completeVoting();
          await expectThrow(instance.vote(0));
        });
      });
    });

    describe("#completeVoting", function() {
      describe("when user is not owner", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();

          await assert.notEqual(instance.owner(), accounts[1]);
          await expectThrow(instance.completeVoting({ from: accounts[1]}));
        });
      });
    });

    describe("#winningProposal", function() {
      describe("when voting is held", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          let votingStatus = await instance.votingCompleted()

          await assert.isFalse(votingStatus);
          await expectThrow(instance.winningProposal());
        });
      });

      describe("when voted more people than expected", function(){
        it("should raise exception", async() => {
          let instance = await Voting.new(0);
          let maxVotes = await instance.maxVotes();

          await instance.addProposal("First Proposal");
          await instance.giveRightToVote(accounts[0]);
          await instance.vote(0);
          await instance.completeVoting();


          await assert.equal(maxVotes, 0)
          await expectThrow(instance.winningProposal());
        });
      });
    });

    describe("#getWinner", function() {
      describe("when voting falsified", function() {
        it("should raise exception", async() => {
          let instance = await Voting.new(0);
          let maxVotes = await instance.maxVotes();

          await instance.addProposal("First Proposal");
          await instance.giveRightToVote(accounts[0]);
          await instance.vote(0);
          await instance.completeVoting();


          await assert.equal(maxVotes, 0)
          await expectThrow(instance.getWinner());
        });
      });

      describe("when voting is held", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          let votingStatus = await instance.votingCompleted()

          await assert.isFalse(votingStatus);
          await expectThrow(instance.getWinner());
        });
      });
    });

    describe("#nextVoting", function() {
      describe("when user is not owner", function(){
        it("should raise exception", async() => {
          let instance = await Voting.deployed();
          await instance.completeVoting();

          await assert.notEqual(instance.owner(), accounts[1]);
          await expectThrow(instance.nextVoting(2, { from: accounts[1] }));
        });
      });

      describe("when voting already held", function() {
        it("should raise exception", async() => {
          let instance = await Voting.deployed();

          await expectThrow(instance.nextVoting(2));
        });
      });
    });
  });
});