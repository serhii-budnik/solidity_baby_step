pragma solidity ^0.4.23;

import "./simple_verifier.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Voting is Ownable, SimpleVerifier {
    // but maybe better include calculation of votes
    // uint256 private votesCount;
    uint256 public maxVotes;
    bool public votingCompleted;
    
    struct Proposal {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        uint weight; // for some future
        bool voted;
        uint proposalID;
    }
    
    mapping(address => Voter) private voters;    
    Proposal[] public proposals;

    constructor(uint256 _maxVotes) public {
        maxVotes = _maxVotes;
    }

    modifier checkUniqName(string _name) {
        for(uint256 i = 0; i < proposals.length; i++) {
            require(
                keccak256(proposals[i].name) != keccak256(_name),
                "name must be uniq"
            );
        }
        _;
    }

    modifier isVoted(address _voter) {
        require(!voters[_voter].voted, "the voter already voted");
        _;
    }

    modifier isHeld() {
        require(!votingCompleted, "voting was completed");
        _;
    }

    modifier isCompleted() {
        require(votingCompleted, "voting do not finished yet");
        _;
    }
    
    function addProposal(string _name)
        public
        onlyOwner
        isHeld
        isBlank(_name)
        checkUniqName(_name)
    {
        proposals.push(Proposal({ name: _name, voteCount: 0 }));
    }

    function giveRightToVote(address _voter)
        public 
        onlyOwner
        isHeld
        isVoted(_voter)
        returns(bool)
    {
        require(voters[_voter].weight == 0, "something went wrong");
        voters[_voter].weight = 1;
        return true;
    }

    function vote(uint256 _proposalID) public isHeld isVoted(msg.sender) {
        Voter storage sender = voters[msg.sender];

        sender.voted = true;    
        sender.proposalID = _proposalID;

        proposals[_proposalID].voteCount += sender.weight;
    }

    function completeVoting() public onlyOwner {
        votingCompleted = true;
    }

    function winningProposal() public isCompleted view returns(uint256 _proposalID) {
        require(votingCompleted, "voting do not finished yet");

        uint256 winningVoteCount = 0;
        uint256 totalVotes;

        for(uint256 i = 0; i < proposals.length; i++) {
            // this way will be cheaper for honest voting
            totalVotes += proposals[i].voteCount; 

            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                _proposalID = i;
            }
        }
        require(totalVotes <= maxVotes, "the voting was falsified");
    }

    function getWinner() public view returns(string, uint256) {
        uint256 proposalID = winningProposal();
        return (proposals[proposalID].name, proposals[proposalID].voteCount);
    }
}
