import React, { useState, useEffect } from 'react';
import "./Appointments.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DocSidebar from '../Sidebar/DocSidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCookies } from "react-cookie";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import contract from "../../contracts/Cruds.json"
import axios from "axios";


const DocAppointments = () => {

    const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState();
    const [appointmentRequests, setAppointmentRequests] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchAppointmentRequests = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDoctorData(data);
                const filteredAppointmentRequests = data.appointmentRequest.filter(appointmentRequest => Object.keys(appointmentRequest).length !== 0);
                setAppointmentRequests(filteredAppointmentRequests);
            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchAppointmentRequests();
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
            const patients = await mycontract.methods.getPatient().call();
            for (let i = patients.length - 1; i >= 0; i--) {
                const ipfsData = await axios.get(`https://gateway.pinata.cloud/ipfs/${patients[i]}`);
                const data = ipfsData.data;
                if (data.mail === mail && data.name === name) {

                    const approvalRequest = data.approvalRequest;
                    approvalRequest.push(doctorData);

                    data.approvalRequest = approvalRequest;

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
                    console.log('Modified IPFS Hash FROM PATIENT DATA:', hash);

                    await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
                        alert("Approval Request Sent");
                        navigate("/doc/dashboard/profile")
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

        mycontract.methods.getDoctor().call().then(async (res) => {
            for (let i = res.length - 1; i >= 0; i--) {
                if (res[i] === cookies['hash']) {
                    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${res[i]}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    const newList = [...data.appointmentRequest];
                    newList.splice(rowIndex, 1);
                    data.appointmentRequest = newList;

                    console.log("IN CONTRACT", data)

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

                    await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
                        setCookie('hash', hash);
                        alert("Deleted");
                        setAppointmentRequests(prevAppointmentRequest => prevAppointmentRequest.filter((_, index) => index !== rowIndex));
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        });
    }


    return (
        <>
            <DocSidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Appointments Requests</p>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell align="right">Patient Email</TableCell>
                                    <TableCell align="right">Approve Request</TableCell>
                                    <TableCell align="right">Delete Request</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointmentRequests.map((appointmentRequests, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {appointmentRequests.patientName}
                                        </TableCell>
                                        <TableCell align="right">{appointmentRequests.patientEmail}</TableCell>
                                        <TableCell align="right" style={{ color: "#00ad05" }}><AddTaskIcon  onClick={() => approve(appointmentRequests.patientName, appointmentRequests.patientEmail)} style={{ cursor: "pointer" }} /></TableCell>
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

export default DocAppointments