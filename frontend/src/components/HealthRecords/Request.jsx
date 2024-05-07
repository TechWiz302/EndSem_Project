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
import AddTaskIcon from '@mui/icons-material/AddTask';
import Web3 from "web3";
import axios from "axios";
import { useCookies } from "react-cookie";
import contract from "../../contracts/Cruds.json";
import { useNavigate } from 'react-router-dom';

const Request = () => {
    const navigate = useNavigate();
    const [approvalRequests, setApprovalRequests] = useState([]);
    const [patientData, setPatientData] = useState();
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchApprovalRequests = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPatientData(data);
                const ApprovalRequests = data.approvalRequest.filter(approvalRequest => Object.keys(approvalRequest).length !== 0);
                setApprovalRequests(ApprovalRequests);
            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchApprovalRequests();
    }, []);

    async function approve(name, mail) {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        try {
            const doctors = await mycontract.methods.getDoctor().call();
            for (let i = doctors.length - 1; i >= 0; i--) {
                const ipfsData = await axios.get(`https://gateway.pinata.cloud/ipfs/${doctors[i]}`);
                const data = ipfsData.data;
                if (data.mail === mail && data.name === name) {

                    const newData = {
                        patientData: patientData,
                        hash: cookies['hash']
                    };

                    console.log("NEW DATA:", newData)
    
                    const patientRecords = data.patientRecords;
                    patientRecords.push(newData);

                    data.patientRecords = patientRecords;

                    console.log(patientRecords)

                    const pinataUploadResponse = await axios({
                        method: "post",
                        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                        data: data,
                        headers: {
                            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                            'Content-Type': 'application/json',
                        }
                    });

                    const hash = pinataUploadResponse.data.IpfsHash;
                    console.log('Modified IPFS Hash FROM Doctor DATA:', hash);

                    await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
                        alert("Patient Data Sent");
                        navigate("/dashboard/profile")
                        return
                    }).catch((err) => {
                        console.log(err);
                    });
                    return;
                }
            }
            alert("Something went wrong");
        } catch (error) {
            console.error('Error retrieving patients from blockchain:', error);
        }
    }


    return (
        <>
            <Sidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Approval Requests</p>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Doctor Name</TableCell>
                                    <TableCell align="right">Doctor Mail</TableCell>
                                    <TableCell align="right">Approval Request</TableCell>
                                    <TableCell align="right">Delete Request</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {approvalRequests.map((approvalRequests, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {approvalRequests.name}
                                        </TableCell>
                                        <TableCell align="right">{approvalRequests.mail}</TableCell>
                                        <TableCell align="right" style={{ color: "#00ad05" }}><AddTaskIcon  onClick={() => approve(approvalRequests.name, approvalRequests.mail)} style={{ cursor: "pointer" }} /></TableCell>
                                        <TableCell align="right" style={{ color: "#f54f4f" }}><DeleteIcon onClick={() => del(approvalRequests.policyNo)} style={{ cursor: "pointer" }} /></TableCell>
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

export default Request