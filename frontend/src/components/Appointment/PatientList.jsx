import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DocSidebar from '../Sidebar/DocSidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useCookies } from "react-cookie";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import contract from "../../contracts/Cruds.json"
import axios from "axios";

const PatientList = () => {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const filteredPatientData = data.patientRecords.filter(patientRecords => Object.keys(patientRecords).length !== 0);
                setPatientData(filteredPatientData);
                console.log(filteredPatientData)
            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchPatientData();
    }, []);

    const handleNavigate = () => {
        navigate(`/doc/dashboard/patient/${patientData[0].hash}`);
    }

    return (
        <>
            <DocSidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Patients</p>
                </div>
                <div className="tableDashboard">
                    <TableContainer component={Paper} sx={{ borderRadius: "0.75em", padding: "15px" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell align="right">Patient Email</TableCell>
                                    <TableCell align="right">Patient Mobile Number</TableCell>
                                    <TableCell align="right">Patient Medical Records</TableCell>
                                    <TableCell align="right">Treated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientData.map((patientData, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {patientData.patientData["name"]}
                                        </TableCell>
                                        <TableCell align="right">{patientData.patientData["mail"]}</TableCell>
                                        <TableCell align="right">{patientData.patientData["mob"]}</TableCell>
                                        <TableCell align="right" style={{ color: "#000" }}><OpenInNewIcon onClick={handleNavigate} style={{ cursor: "pointer" }} /></TableCell>
                                        <TableCell align="right" style={{ color: "#00ad05" }}><AddTaskIcon style={{ cursor: "pointer" }} /></TableCell>
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

export default PatientList