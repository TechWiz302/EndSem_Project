import React, { useState } from 'react'
import "./Insurance.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../Sidebar/Sidebar'
import Web3 from "web3";
import axios from "axios";
import { useCookies } from "react-cookie";
import contract from "../../contracts/Cruds.json";
import { useNavigate } from 'react-router-dom';


const MedicalHistoryForm = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [cookies, setCookie] = useCookies();

    const [addFormData, setAddFormData] = useState({
        diseaseName: "",
        diagnosedDate: "",
        medicalStatus: "Treated",
    });

    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleAddFormChange = (e) => {

        if (e.target) {
            const newFormData = { ...addFormData };
            newFormData[event.target.name] = event.target.value;
            setAddFormData(newFormData);
        } else {
            // Date picker change
            let diagnosedDate = formatDate(e)
            const newFormData = { ...addFormData, diagnosedDate: diagnosedDate };
            setStartDate(e);
            setAddFormData(newFormData);
        }
    };

    console.log(addFormData)

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
                            const medicalhistory = data.medicalhistory;
                            medicalhistory.push(addFormData);

                            data.medicalhistory = medicalhistory;

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
                            console.log('Modified IPFS Hash:', hash);

                            await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
                                setCookie('hash', hash);
                                alert("Medical history Added");
                                navigate("/dashboard/medical-history")
                            }).catch((err) => {
                                console.log(err);
                            });
                        } catch (error) {
                            console.error('Error fetching/pinning data to IPFS:', error);
                        }
                    }
                }
            });
    }

    return (
        <>
            <Sidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Add Medical History</p>
                </div>
                <div className="appointmentForm">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="diseaseName" className="input-label">Select Disease</label>
                            <select className="form-control" name="diseaseName" id="diseaseName" onChange={handleAddFormChange}>
                                <option value="">Select Disease</option>
                                <optgroup label="General">
                                    <option value="Fever">Fever</option>
                                    <option value="Common Cold">Common Cold</option>
                                    <option value="Flu">Flu</option>
                                    <option value="Stomach Flu">Stomach Flu</option>
                                    <option value="Headache">Headache</option>
                                    <option value="Sore Throat">Sore Throat</option>
                                    <option value="Diarrhea">Diarrhea</option>
                                </optgroup>
                                <optgroup label="Cardiology">
                                    <option value="Heart Disease">Heart Disease</option>
                                    <option value="Hypertension">Hypertension</option>
                                    <option value="Arrhythmia">Arrhythmia</option>
                                </optgroup>
                                <optgroup label="Dermatology">
                                    <option value="Eczema">Eczema</option>
                                    <option value="Psoriasis">Psoriasis</option>
                                    <option value="Acne">Acne</option>
                                </optgroup>
                                <optgroup label="Gastroenterology">
                                    <option value="Gastroesophageal Reflux Disease">Gastroesophageal Reflux Disease (GERD)</option>
                                    <option value="Irritable Bowel Syndrome">Irritable Bowel Syndrome (IBS)</option>
                                    <option value="Crohn's Disease">Crohn's Disease</option>
                                </optgroup>
                                <optgroup label="ENT (Ear, Nose, and Throat)">
                                    <option value="Otitis Media">Otitis Media</option>
                                    <option value="Sinusitis">Sinusitis</option>
                                    <option value="Tonsillitis">Tonsillitis</option>
                                </optgroup>
                                <optgroup label="Neurology">
                                    <option value="Migraine">Migraine</option>
                                    <option value="Epilepsy">Epilepsy</option>
                                    <option value="Parkinson's Disease">Parkinson's Disease</option>
                                </optgroup>
                                <optgroup label="Ophthalmology">
                                    <option value="Cataracts">Cataracts</option>
                                    <option value="Glaucoma">Glaucoma</option>
                                    <option value="Conjunctivitis">Conjunctivitis</option>
                                </optgroup>
                                <optgroup label="Orthopedics">
                                    <option value="Osteoarthritis">Osteoarthritis</option>
                                    <option value="Rheumatoid Arthritis">Rheumatoid Arthritis</option>
                                    <option value="Fracture">Fracture</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="diagnosedDate">Date Diagnosed</label>
                            <DatePicker name='diagnosedDate' className='form-control' selected={startDate} placeholderText='Date Diagnosed' dateFormat="dd/MM/yyyy" onChange={(date) => {
                                setStartDate(date);
                                handleAddFormChange(date)
                                console.log(startDate);
                            }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="medicalStatus">Status</label>
                            <select className="form-control" name='medicalStatus' id="medicalStatus" onChange={handleAddFormChange} required>
                                <option value="Treated">Treated</option>
                                <option value="Ongoing Treatment">Ongoing Treatment</option>
                            </select>
                        </div>
                        <input type="button" className='addRecordBtn' value="Add Record" onClick={submit} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default MedicalHistoryForm