// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Cruds {
    string[] doctors;
    string[] patients;

    function addDoctor(string memory doc_cid) public {
        doctors.push(doc_cid);
    }

    function getDoctor() public view returns (string[] memory) {
        return doctors;
    }

    function addPatient(string memory patient_cid) public {
        patients.push(patient_cid);
    }

    function getPatient() public view returns (string[] memory) {
        return patients;
    }
}
