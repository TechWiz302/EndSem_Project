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

const AllergiesForm = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [cookies, setCookie] = useCookies();

    const [addFormData, setAddFormData] = useState({
        allergyName: "",
        reaction: "",
        medication: "",
        allergyDiagnosedDate: "",
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
            let allergyDiagnosedDate = formatDate(e)
            const newFormData = { ...addFormData, allergyDiagnosedDate: allergyDiagnosedDate };
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
                            const allergies = data.allergies;
                            allergies.push(addFormData);

                            data.allergies = allergies;

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
                                navigate("/dashboard/allergies")
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
                    <p>Add Allergies</p>
                </div>
                <div className="appointmentForm">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="allergyName">Name</label>
                            <input name='allergyName' className="form-control" onChange={handleAddFormChange} type="text" placeholder='Allergen' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reaction">Reaction</label>
                            <input name='reaction' className="form-control" onChange={handleAddFormChange} type="text" placeholder='Reaction' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="medication">Medication</label>
                            <input name='medication' className="form-control" onChange={handleAddFormChange} type="text" placeholder='Medication Prescriped' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="allergyDiagnosedDate">Date Diagnosed</label>
                            <DatePicker name='allergyDiagnosedDate' className='form-control' selected={startDate} placeholderText='Date Diagnosed' dateFormat="dd/MM/yyyy" onChange={(date) => {
                                setStartDate(date);
                                handleAddFormChange(date)
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

export default AllergiesForm