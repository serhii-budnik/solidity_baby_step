var Voting = artifacts.require("Voting");

contract('Voting', function(accounts) {
  it('should set maxVotes value of 2', function() {
    return Voting.deployed().then(function(instance){
      return instance.maxVotes(); //.call(accounts[0]);
    }).then(function(maxVotes){
      console.log("maxVotes: ", maxVotes);
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
      votingInst = instance;
      return instance.addProposal("Serhii");//.call(accounts[0]);
    }).then(function() {
      return votingInst.proposals(0);
    }).then(function(proposal) {
      // Here get first element from array Struct(name, voteCount);
      assert.equal(proposal[0], 'Serhii', 'Name is not a Serhii');
      assert.equal(proposal[1], 0, 'voteCount is not a zero');
    });
  });
});

/********************
 * Using ASYNC/AWAIT *
********************/

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
