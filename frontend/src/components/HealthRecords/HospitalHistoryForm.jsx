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

const HospitalHistoryForm = () => {
    const navigate = useNavigate();

    const [admittedDate, setAdmittedDate] = useState("");
    const [dischargedDate, setDischargedDate] = useState("");
    const [cookies, setCookie] = useCookies();

    const [addFormData, setAddFormData] = useState({
        hospitalName: "",
        reason: "",
        surgeryPerformed: "No",
        admittedDate: "",
        dischargedDate: "",
    });

    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleAddFormChange = (e) => {
        const newFormData = { ...addFormData };
        newFormData[e.target.name] = e.target.value;
        setAddFormData(newFormData);
    };

    const handleAdmittedDate = (date) => {
        let admittedDate = formatDate(date)
        const newFormData = { ...addFormData };
        newFormData.admittedDate = admittedDate;
        setAddFormData(newFormData);
    }
    
    const handleDischaregedDate = (date) => {
        let dischargedDate = formatDate(date)
        const newFormData = { ...addFormData };
        newFormData.dischargedDate = dischargedDate;
        setAddFormData(newFormData);
    }

    console.log(addFormData);

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
                            const hospitalizationhistory = data.hospitalizationhistory;
                            hospitalizationhistory.push(addFormData);

                            data.hospitalizationhistory = hospitalizationhistory;

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
                                alert("Hospitalization History Added");
                                navigate("/dashboard/hospitalization-history")
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
                    <p>Add Hospital History</p>
                </div>
                <div className="appointmentForm">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="hospitalName">Hospital Name</label>
                            <input name='hospitalName' className="form-control" type="text" onChange={handleAddFormChange} placeholder='Hospital Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Reason</label>
                            <input name='reason' className="form-control" type="text" onChange={handleAddFormChange} placeholder='Reason' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surgeryPerformed">Surgery Performed</label>
                            <select name='surgeryPerformed' className="form-control" id="Surgery Performed" onChange={handleAddFormChange} required>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="admittedDate">Admitted Date</label>
                            <DatePicker name='admittedDate' className='form-control' selected={admittedDate} placeholderText='Admitted Date' dateFormat="dd/MM/yyyy" onChange={(date) => {
                                setAdmittedDate(date);
                                handleAdmittedDate(date);
                            }} />
                        </div><div className="form-group">
                            <label htmlFor="dischargedDate">Discharged DaDate</label>
                            <DatePicker name='dischargedDate' className='form-control' selected={dischargedDate} placeholderText='Discharged Date' dateFormat="dd/MM/yyyy" onChange={(date) => {
                                setDischargedDate(date);
                                handleDischaregedDate(date);
                            }} />
                        </div>
                        <input type="button" className='addRecordBtn' value="Add Record" onClick={submit} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default HospitalHistoryForm