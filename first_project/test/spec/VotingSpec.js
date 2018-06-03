import testHelper from '../testHelper.js';

var Voting = artifacts.require("Voting");

contract('2nd Voting Test', async (accounts) => {
  it('should set for maxVotes value 2', async() => {
    let instance = await Voting.deployed();
    let maxVotes = await instance.maxVotes.call();

    assert.equal(maxVotes, 2)
  });

  it('should return id value of voting', async() => {
    let instance = await Voting.deployed();
    let id = await instance.id.call();

    assert.equal(id, 1, 'id of contact after deploy')
  });

  it('should add record to proposals array', async() => {
    let instance = await Voting.deployed();
    await instance.addProposal('Serhii');
    let proposal = await instance.proposals(0);

    console.log("proposal", proposal);
    assert.equal(proposal[0], 'Serhii', "Name wasn't Serhii");
    assert.equal(proposal[1], 0, "VoteCount wasn't equal to zero");
  });
})
