import React, { useState, useEffect } from 'react'
import "./MakeAppointment.css"
import Sidebar from '../Sidebar/Sidebar'
import contract from "../../contracts/Cruds.json";
import Web3 from 'web3';
import axios from "axios"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';



const MakeAppointment = () => {
    const navigate = useNavigate();


    const [doctors, setDoctors] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {

        const fetchDoctors = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const currentaddress = accounts[0];

            const web3 = new Web3(window.ethereum);
            const mycontract = new web3.eth.Contract(
                contract["abi"],
                contract["address"]
            );

            try {
                const doctorHashes = await mycontract.methods.getDoctor().call();
                const doctorsData = await Promise.all(
                    doctorHashes.map(async (hash) => {
                        const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);
                        return response.data;
                    })
                );
                setDoctors(doctorsData);
            } catch (error) {
                console.error('Error fetching doctors from contract:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const filteredDoctors = doctors.filter((doctor) => {
        return doctor.specialization === selectedDepartment;
    });


    const [cookies, setCookie] = useCookies();

    const [patientAppointmentData, setPatientAppointmentData] = useState({
        medicalDepartment: "",
        doctorName: "",
    });

    const handlePatientFormChange = (e) => {
        const newFormData = { ...patientAppointmentData };
        newFormData[e.target.name] = e.target.value;
        setPatientAppointmentData(newFormData);
    };

    console.log(patientAppointmentData)

    const [patientRequestData, setPatientRequestData] = useState({
        patientName: "",
        patientEmail: "",
    });

    const handleDoctorFormChange = (e) => {
        const newFormData = { ...patientRequestData };
        newFormData[e.target.name] = e.target.value;
        setPatientRequestData(newFormData);
    };

    console.log(patientRequestData)


    async function submit() {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        mycontract.methods
            .getPatient()
            .call()
            .then(async (res) => {
                for (let i = res.length - 1; i >= 0; i--) {
                    if (res[i] === cookies['hash']) {
                        try {
                            const pinataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${res[i]}`);
                            const data = pinataResponse.data;
                            const appointmentMade = data.appointmentMade || [];
                            appointmentMade.push(patientAppointmentData);

                            data.appointmentMade = appointmentMade;

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
                                setCookie('hash', hash);
                                alert("Appointment Made");
                                navigate("/dashboard/appointment")
                            }).catch((err) => {
                                console.log(err);
                            });
                        } catch (error) {
                            console.error('Error fetching/pinning data to IPFS:', error);
                        }
                    }
                }
            });

        mycontract.methods.getDoctor().call().then(async (res) => {
            for (let i = doctors.length - 1; i >= 0; i--) {
                const licenseNumber = patientAppointmentData.doctorName.split('-')[1].trim();
                if (doctors[i].license === licenseNumber) {
                    try {
                        const pinataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${res[i]}`);
                        const data = pinataResponse.data;
                        const appointmentRequest = data.appointmentRequest || [];
                        appointmentRequest.push(patientRequestData);

                        data.appointmentRequest = appointmentRequest;

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
                        console.log('Modified IPFS Hash FROM DOCTOR DATA:', hash);

                        await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
                            alert("Appointment Request Sent");
                            navigate("/dashboard/appointment");
                        }).catch((err) => {
                            console.log(err);
                        });
                        return;
                    } catch (error) {
                        console.error('Error fetching/pinning data to IPFS:', error);
                    }
                }
            }
        })
    }

    return (
        <>
            <Sidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Book Appointment</p>
                </div>
                <div className="appointmentForm">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="patientName">Name</label>
                            <input name='patientName' className="form-control" type="text" onChange={handleDoctorFormChange} placeholder='Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="patientEmail">Email</label>
                            <input name='patientEmail' className="form-control" type="email" onChange={handleDoctorFormChange} placeholder='Email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="medicalDepartment">Select Medical Department</label>
                            <select
                                name='medicalDepartment'
                                className="form-control"
                                id="medicalDepartment"
                                onChange={(e) => {
                                    handleDepartmentChange(e);
                                    handlePatientFormChange(e);
                                }}
                                value={selectedDepartment}
                            >
                                <option value="">Select Department</option>
                                <option value="Family_Medicine">Family Medicine</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Pathology">Pathology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="ENT">ENT (Ear, Nose, and Throat)</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Radiology">Radiology</option>
                                <option value="Urology">Urology</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Nephrology">Nephrology</option>
                                <option value="Pulmonology">Pulmonology</option>
                                <option value="Rheumatology">Rheumatology</option>
                                <option value="Hematology">Hematology</option>
                                <option value="Allergy_Immunology">Allergy & Immunology</option>
                                <option value="General_Surgery">General Surgery</option>
                                <option value="Internal_Medicine">Internal Medicine</option>
                                <option value="Anesthesiology">Anesthesiology</option>
                                <option value="Emergency_Medicine">Emergency Medicine</option>
                                <option value="Geriatrics">Geriatrics</option>
                                <option value="Nurse_Practitioner">Nurse Practitioner</option>
                                <option value="Physician_Assistant">Physician Assistant</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctorName">Doctor Available</label>
                            <select name='doctorName' className="form-control" onChange={(e) => handlePatientFormChange(e)} id="doctorName">
                                <option value="">Select Doctors</option>
                                {filteredDoctors.reduce((uniqueDoctors, doctor) => {
                                    if (!uniqueDoctors.some((d) => d.name === doctor.name)) {
                                        uniqueDoctors.push(doctor);
                                    }
                                    return uniqueDoctors;
                                }, []).map((doctor, index) => (
                                    <option key={index} value={`${doctor.name} - ${doctor.license}`}>
                                        {`${doctor.name} - ${doctor.license}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input type="button" className='addRecordBtn' value="Add Record" onClick={submit} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default MakeAppointment