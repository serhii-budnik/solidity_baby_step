import testHelper from '../testHelper.js';
import Asserts from '../helpers/asserts.js';

var Voting = artifacts.require("Voting");

let asserts = Asserts(assert);

contract('Voting', async (accounts) => {

  describe("after deploy", function() {
    it('should set for maxVotes value 2', async() => {
      let instance = await Voting.deployed();
      let maxVotes = await instance.maxVotes.call();

      assert.equal(maxVotes, 2)
    });

    it('should return id value of voting', async() => {
      let instance = await Voting.deployed();
      let id = await instance.id.call();

      assert.equal(id, 1, 'id of contact after deploy');

    });
  });

  describe("#addProposal", function() {
    it('should add record to proposals array', async() => {
      let instance = await Voting.deployed();
      await instance.addProposal('Serhii');
      let proposal = await instance.proposals(0);
      let proposalsLength = await instance.proposalsLength();

      await assert.equal(proposalsLength, 1)
      await assert.equal(proposal[0], 'Serhii', "Name wasn't Serhii");
      await assert.equal(proposal[1], 0, "VoteCount wasn't equal to zero");
    });
  });

  describe("#giveRightToVote", function() {
    describe("when voting held for the first time", function(){
      it("should return true", async() => {
        let instance = await Voting.deployed();
        let owner = await instance.owner.call();
        let ownerVoter = await instance.voters.call(owner);

        await assert.equal(ownerVoter[0], 0);     // weight
        await assert.equal(ownerVoter[1], false); // voted
        await assert.equal(ownerVoter[2], 0);     // proposalID
        await assert.equal(ownerVoter[3], 0);     // votingID

        let outcome = await instance.giveRightToVote(accounts[0]);
        // await asserts(outcome);
        ownerVoter = await instance.voters.call(owner);

        await assert.equal(ownerVoter[0], 1);     // weight
        await assert.equal(ownerVoter[1], false); // voted
        await assert.equal(ownerVoter[2], 0);     // proposalID
        await assert.equal(ownerVoter[3], 1);     // votingID
      });
    });

    describe("when voting held for the second time", function(){
      it("should return true", async() => {
        let instance = await Voting.deployed();
        let owner = await instance.owner.call();
        let ownerVoter = await instance.voters.call(owner);

        await assert.equal(ownerVoter[0], 0);     // weight
        await assert.equal(ownerVoter[1], false); // voted
        await assert.equal(ownerVoter[2], 0);     // proposalID
        await assert.equal(ownerVoter[3], 0);     // votingID

        await instance.completeVoting();
        await instance.nextVoting(2);

        // let outcome = await instance.giveRightToVote(accounts[0]);
        asserts.doesNotThrow(instance.giveRightToVote(accounts[0]));
        // await asserts(outcome);

        ownerVoter = await instance.voters.call(owner);

        await assert.equal(ownerVoter[0], 1);     // weight
        await assert.equal(ownerVoter[1], false); // voted
        await assert.equal(ownerVoter[2], 0);     // proposalID
        await assert.equal(ownerVoter[3], 2);     // votingID
      });
    });

    describe("when voting held for the second time", function(){
      it("should return true", async() => {
      });
    });
  });
})
