import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCookies } from "react-cookie";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import contract from "../../contracts/Cruds.json"
import axios from "axios";

const VaccinationRecords = () => {
    const navigate = useNavigate();
    const [vaccination, setVaccination] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchVaccinationRecords = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const filteredVaccination = data.vaccinationHistory.filter(vaccination => Object.keys(vaccination).length !== 0);
                setVaccination(filteredVaccination);
            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchVaccinationRecords();
    }, []);

    // async function del(vaccineName) {
    //     var accounts = await window.ethereum.request({
    //         method: "eth_requestAccounts",
    //     });
    //     var currentaddress = accounts[0];

    //     const web3 = new Web3(window.ethereum);
    //     const mycontract = new web3.eth.Contract(
    //         contract["abi"],
    //         contract["address"]
    //     );

    //     mycontract.methods.getPatient().call().then(async (res) => {
    //         for (let i = res.length - 1; i >= 0; i--) {
    //             if (res[i] === cookies['hash']) {
    //                 const response = await fetch(`https://gateway.pinata.cloud/ipfs/${res[i]}`);
    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch data');
    //                 }
    //                 const data = await response.json();
    //                 const alls = data.vaccinationHistory;
    //                 const newList = [];
    //                 for (let j = 1; j < alls.length; j++) {
    //                     if (alls[j].vaccineName === vaccineName) {
    //                         continue;
    //                     } else {
    //                         newList.push(alls[j]);
    //                     }
    //                 }
    //                 data.vaccinationHistory = newList;

    //                 const pinataResponse = await axios({
    //                     method: "post",
    //                     url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    //                     data: data,
    //                     headers: {
    //                         pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
    //                         pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
    //                         'Content-Type': 'application/json',
    //                     }
    //                 });

    //                 const hash = pinataResponse.data.IpfsHash;

    //                 await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
    //                     setCookie('hash', hash);
    //                     alert("Deleted");
    //                     window.location.reload();
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 });
    //             }
    //         }
    //     });
    // }

    async function del(rowIndex) {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        mycontract.methods.getPatient().call().then(async (res) => {
            for (let i = res.length - 1; i >= 0; i--) {
                if (res[i] === cookies['hash']) {
                    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${res[i]}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    const vaccinationHistory = data.vaccinationHistory;
                    vaccinationHistory.splice(rowIndex, 1);

                    data.vaccinationHistory = vaccinationHistory;

                    const pinataResponse = await axios({
                        method: "post",
                        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                        data: data,
                        headers: {
                            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                            'Content-Type': 'application/json',
                        }
                    });

                    const hash = pinataResponse.data.IpfsHash;

                    await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
                        setCookie('hash', hash);
                        alert("Deleted");
                        window.location.reload();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        });
    }


    return (
        <>
            <Sidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Vaccination Records</p>
                </div>
                <div className="createInsuranceRecord">
                    <div className="signupbtn">
                        <button type='button' className="input-submit" onClick={() => { navigate("/dashboard/vaccination-recordForm") }}>ADD Record</button>
                    </div>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vaccination Name</TableCell>
                                    <TableCell align="right">Hospital Name</TableCell>
                                    <TableCell align="right">Administered Date</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vaccination.map((vaccination, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {vaccination.vaccineName}
                                        </TableCell>
                                        <TableCell align="right">{vaccination.hospitalName}</TableCell>
                                        <TableCell align="right">{vaccination.administeredDate}</TableCell>
                                        <TableCell align="right" style={{ color: "#f54f4f" }}><DeleteIcon onClick={() => del(vaccination.vaccineName)} style={{ cursor: "pointer" }} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default VaccinationRecords