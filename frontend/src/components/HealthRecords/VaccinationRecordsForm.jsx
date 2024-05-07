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

const VaccinationRecordsForm = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [cookies, setCookie] = useCookies();

    const [addFormData, setAddFormData] = useState({
        vaccineName: "",
        hospitalName: "",
        administeredDate: "",
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
            let administeredDate = formatDate(e)
            const newFormData = { ...addFormData, administeredDate: administeredDate };
            setStartDate(e);
            setAddFormData(newFormData);
        }
    };

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
                            const vaccination = data.vaccinationHistory;
                            vaccination.push(addFormData);

                            data.vaccinationHistory = vaccination;

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
                                alert("Insurance Added");
                                navigate("/dashboard/vaccination-record")
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

    console.log(addFormData)

    return (
        <>
            <Sidebar />
            <div className='profile'>
                <div className="headingAppointment">
                    <p>Add Vaccination Records</p>
                </div>
                <div className="appointmentForm">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="vaccineName" className="input-label">Vaccination</label>
                            <select className="form-control" name="vaccineName" id="vaccineName" onChange={handleAddFormChange}>
                                <option value="">Select Vaccination</option>
                                <option value="Pfizer-BioNTech">Pfizer-BioNTech</option>
                                <option value="Moderna">Moderna</option>
                                <option value="Johnson & Johnson">Johnson & Johnson</option>
                                <option value="AstraZeneca">AstraZeneca</option>
                                <option value="Sinovac">Sinovac</option>
                                <option value="Sinopharm">Sinopharm</option>
                                <option value="Sputnik V">Sputnik V</option>
                                <option value="Covaxin">Covaxin</option>
                                <option value="Covovax">Covovax</option>
                                <option value="Novavax">Novavax</option>
                                <option value="Covishield">Covishield</option>
                                <option value="Bharat Biotech">Bharat Biotech</option>
                                <option value="Sanofi Pasteur">Sanofi Pasteur</option>
                                <option value="Pfizer">Pfizer</option>
                                <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                                <option value="Merck & Co.">Merck & Co.</option>
                                <option value="Tetanus Toxoid">Tetanus Toxoid</option>
                                <option value="Polio Vaccine">Polio Vaccine</option>
                                <option value="Hepatitis B Vaccine">Hepatitis B Vaccine</option>
                                <option value="MMR Vaccine">MMR Vaccine</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hospitalName">Hospital Name</label>
                            <input name='hospitalName' className="form-control" type="text" onChange={handleAddFormChange} placeholder='Hospital Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="administeredDate">Administered Date</label>
                            <DatePicker name='administeredDate' className='form-control' selected={startDate} placeholderText='Administered Date' dateFormat="dd/MM/yyyy" onChange={(date) => {
                                setStartDate(date);
                                handleAddFormChange(date);
                                console.log(startDate);
                            }} />
                        </div>
                        <input type="button" className='addRecordBtn' value="Add Record" onClick={submit} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default VaccinationRecordsForm