pragma solidity ^0.4.17;

contract dogOwner{

    address private owner;


    mapping(uint256=>string) public List;


    function dogOwner() public {

        owner=msg.sender;
    }

    function updateList(uint256 dogId, string memory Owner) public payable {


        List[dogId]=Owner;


    }

    function getOwner(uint256 dogId) public view returns(string){

        return List[dogId];
    }






}
