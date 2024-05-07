import React, { useState, useEffect } from 'react'
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

const Allergies = () => {
    const navigate = useNavigate();
    const [allergies, setAllergies] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const filteredInsurances = data.allergies.filter(insurance => Object.keys(insurance).length !== 0);
                setAllergies(filteredInsurances);
            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchAllergies();
    }, []);


    // async function del(AllergyName) {
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
    //                 const alls = data.allergies;
    //                 const newList = [];
    //                 for (let j = 1; j < alls.length; j++) {
    //                     if (alls[j].AllergyName === AllergyName) {
    //                         continue;
    //                     } else {
    //                         newList.push(alls[j]);
    //                     }
    //                 }
    //                 data.allergies = newList;

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
                    const newList = [...data.allergies];
                    newList.splice(rowIndex, 1);
                    data.allergies = newList;

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
                        setAllergies(prevAllergies => prevAllergies.filter((_, index) => index !== rowIndex));
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
                    <p>Allergies</p>
                </div>
                <div className="createInsuranceRecord">
                    <div className="signupbtn">
                        <button type='button' className="input-submit" onClick={() => { navigate("/dashboard/allergiesForm") }}>ADD Record</button>
                    </div>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Allergy Name</TableCell>
                                    <TableCell align="right">Reaction</TableCell>
                                    <TableCell align="right">Medication Precribed</TableCell>
                                    <TableCell align="right">Date Diagnoed</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allergies.map((allergies, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {allergies.allergyName}
                                        </TableCell>
                                        <TableCell align="right">{allergies.reaction}</TableCell>
                                        <TableCell align="right">{allergies.medication}</TableCell>
                                        <TableCell align="right">{allergies.allergyDiagnosedDate}</TableCell>
                                        <TableCell align="right" style={{ color: "#f54f4f" }}><DeleteIcon onClick={() => del(index)} style={{ cursor: "pointer" }} /></TableCell>
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

export default Allergies