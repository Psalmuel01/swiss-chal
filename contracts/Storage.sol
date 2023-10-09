// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Storage {
    string private data;

    constructor(string memory defaultData) {
        data = defaultData;
    }

    function setData(string memory _data) public {
        data = _data;
    }

    function getData() public view returns (string memory) {
        return data;
    }
}
