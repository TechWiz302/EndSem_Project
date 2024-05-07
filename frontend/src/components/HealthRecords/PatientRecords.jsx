import React, { useState, useEffect } from 'react';
import "./Insurance.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DocSidebar from '../Sidebar/DocSidebar';
import { useCookies } from "react-cookie";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import contract from "../../contracts/Cruds.json"
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const PatientRecords = () => {
    const { patientHash } = useParams();
    const navigate = useNavigate();
    const [insurances, setInsurances] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [hospitalHistory, setHospitalHistory] = useState([]);
    const [vaccination, setVaccination] = useState([]);



    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${patientHash}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Insurance Data
                const filteredInsurances = data.insurance.filter(insurance => Object.keys(insurance).length !== 0);
                setInsurances(filteredInsurances);

                // Allergies
                const filteredAllergies = data.allergies.filter(insurance => Object.keys(insurance).length !== 0);
                setAllergies(filteredAllergies);

                // Medical History
                const filteredMedicalHistory = data.medicalhistory.filter(medicalhistory => Object.keys(medicalhistory).length !== 0);
                setMedicalHistory(filteredMedicalHistory);

                // Hospitalization Records
                const filteredHospitalHistory = data.hospitalizationhistory.filter(hospitalizationhistory => Object.keys(hospitalizationhistory).length !== 0);
                setHospitalHistory(filteredHospitalHistory);

                // Vaccination Records
                const filteredVaccination = data.vaccinationHistory.filter(vaccination => Object.keys(vaccination).length !== 0);
                setVaccination(filteredVaccination);

            } catch (error) {
                console.error('Error fetching insurance data:', error);
            }
        };
        fetchMedicalRecords();
    }, []);

    return (
        <>
            <DocSidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Patient Medical Records</p>
                </div>
                <div className="tableDashboard mt-3">
                    <div className="recordsHeading">
                        <p>Insurance Records</p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder' }}>Company</TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bolder' }}>Policy Number</TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bolder' }}>Expiry Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {insurances.map((insurance, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {insurance.companyName}
                                        </TableCell>
                                        <TableCell align="right">{insurance.policyNo}</TableCell>
                                        <TableCell align="right">{insurance.expiryDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="tableDashboard mt-3">
                    <div className="recordsHeading">
                        <p>Allergy Records</p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Allergy Name</TableCell>
                                    <TableCell align="right">Reaction</TableCell>
                                    <TableCell align="right">Medication Precribed</TableCell>
                                    <TableCell align="right">Date Diagnoed</TableCell>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="tableDashboard mt-3">
                    <div className="recordsHeading">
                        <p>Medical Records</p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Disease Name</TableCell>
                                    <TableCell align="right">Diagnosed Date</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicalHistory.map((medicalHistory, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {medicalHistory.diseaseName}
                                        </TableCell>
                                        <TableCell align="right">{medicalHistory.diagnosedDate}</TableCell>
                                        <TableCell align="right">{medicalHistory.medicalStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="tableDashboard mt-3">
                    <div className="recordsHeading">
                        <p>Hospitalization Records</p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Hospital Name</TableCell>
                                    <TableCell align="right">Reason</TableCell>
                                    <TableCell align="right">Surgery Performed</TableCell>
                                    <TableCell align="right">Admitted Date</TableCell>
                                    <TableCell align="right">Discharged Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hospitalHistory.map((hospitalHistory, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {hospitalHistory.hospitalName}
                                        </TableCell>
                                        <TableCell align="right">{hospitalHistory.reason}</TableCell>
                                        <TableCell align="right">{hospitalHistory.surgeryPerformed}</TableCell>
                                        <TableCell align="right">{hospitalHistory.admittedDate}</TableCell>
                                        <TableCell align="right">{hospitalHistory.dischargedDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="tableDashboard mt-3 mb-3">
                    <div className="recordsHeading">
                        <p>Vaccination Records</p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vaccination Name</TableCell>
                                    <TableCell align="right">Hospital Name</TableCell>
                                    <TableCell align="right">Administered Date</TableCell>
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

export default PatientRecords