import React, { useState, useEffect } from 'react'
import "./Appointments.css"
import Sidebar from "../Sidebar/Sidebar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DocSidebar from '../Sidebar/DocSidebar';
import { useCookies } from "react-cookie";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import contract from "../../contracts/Cruds.json"
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';



const Appointments = () => {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (data && Array.isArray(data.appointmentMade)) {
                    const filteredAppointments = data.appointmentMade.filter(appointmentMade => Object.keys(appointmentMade).length !== 0);
                    setAppointments(filteredAppointments);
                } else {
                    console.error('Appointment data is not an array:', data.appointmentMade);
                }
            } catch (error) {
                console.error('Error fetching appointment data:', error);
            }
        };
        fetchAppointments();
    }, []);

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
                    const newList = [...data.appointmentMade];
                    newList.splice(rowIndex, 1);
                    data.appointmentMade = newList;

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
                        setAppointments(prevAppointments => prevAppointments.filter((_, index) => index !== rowIndex));
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
                    <p>Appointments</p>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Medical Department</TableCell>
                                    <TableCell align="right">Doctor Name</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appointments, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {appointments.medicalDepartment}
                                        </TableCell>
                                        <TableCell align="right">{appointments.doctorName}</TableCell>
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

export default Appointments