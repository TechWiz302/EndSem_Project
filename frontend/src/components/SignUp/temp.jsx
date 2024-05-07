import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Navbar from '../Navbar/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Web3 from "web3";
import contract from "../../contracts/Cruds.json";
import axios from "axios"


function SignUp() {

    const [startDate, setStartDate] = useState(new Date());


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [type, setType] = useState(false);
    const [specialization, setSpecialization] = useState('');
    const [gender, setGender] = useState('');
    const [bloogGroup, setBloodGroup] = useState('');



    const [regp, setRegp] = useState({
        "name": "",
        "mail": "",
        "password": "",
        "userType": "Patient",
        "gender": "",
        "bloodGroup": "",
        "dob": "",
        "mob": "",
        "insurance": [{}],
        "allergies": [{}],
        "medicalhistory": [{}],
        "hospitalizationhistory": [{}],
        "visit": [{}],
        "selectedDoctors": [{}]
    });

    const [regd, setRegd] = useState({
        "name": "",
        "mail": "",
        "password": "",
        "license": "",
        "specialization": ""
    });

    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function handle(e) {
        if (e.target) {
            // Regular input change
            const newData1 = { ...regp };
            const newData2 = { ...regd };
            newData1[e.target.name] = e.target.value;
            newData2[e.target.name] = e.target.value;
    
            setRegp(newData1);
            setRegd(newData2);
        } else {
            // Date picker change
            let dateOfBirth = formatDate(e)
            const newData1 = { ...regp, dob: dateOfBirth };
            const newData2 = { ...regd, dob: dateOfBirth };
            setStartDate(e);
            setRegp(newData1);
            setRegd(newData2);
        }
    }

    function handleD(e) {
        const newData = { ...regd };
        newData[e.target.name] = e.target.value;

        newData.dob = startDate;

        setRegd(newData);
    }

    console.log(regp)

    async function register(e) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        if (!e) {
            // patient
            console.log("INSIDE PATIENT")

            try {
                const pinataResponse = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: regp,
                    headers: {
                        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                        'Content-Type': 'application/json',
                    }
                })

                const hash = pinataResponse.data.IpfsHash;
                console.log('Patient Hash:', hash);

                await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
                    alert('Account created');
                }).catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.error('Error pinning data to IPFS:', error);
            }
        }
        else {
            // doctor

            try {
                const pinataResponse = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: regd,
                    headers: {
                        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                        'Content-Type': 'application/json',
                    }
                })

                const hash = pinataResponse.data.IpfsHash;
                console.log('Doctor Hash:', hash);

                await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
                    alert("Account created");
                }).catch((err) => {
                    console.log(err);
                })



            } catch (error) {
                console.error('Error pinning data to IPFS:', error);
            }
        }
    }



    return (
        <>
            <div className="signUp heroSection">
                <Navbar />
                <div className="page">
                    <div className="login">
                        <div className="container">
                            <div className="wrapper">
                                <div className="heading">
                                    <h1 className="text text-large">Signup</h1>
                                    <p className="text text-normal">Already Have Account? <span><a href="/login" className="text text-links">Login</a></span>
                                    </p>
                                </div>
                                <form name="signin" className="form" >
                                    <div className="input-control">
                                        <label htmlFor="name" className="input-label" hidden>Full Name</label>
                                        <input type="text" onChange={(e) => handle(e)} name="name" id="name" className="input-field" placeholder="Full Name" required />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="email" className="input-label" hidden>Email Address</label>
                                        <input type="email" onChange={(e) => handle(e)} name="mail" id="email" className="input-field" placeholder="Email Address" required />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="password" className="input-label" hidden>Password</label>
                                        <input type="password" onChange={(e) => handle(e)} name="password" id="password" className="input-field" placeholder="Password" required />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="select" className="input-label" hidden>Select</label>
                                        <select
                                            name="userType"
                                            id="select"
                                            className="input-field"
                                            onChange={(e) => {
                                                handle(e);
                                                setType(!type);
                                            }}
                                            required
                                        >
                                            <option value="Patient">Patient</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                    </div>

                                    {type && (
                                        <div className="doctor-div">
                                            <div className="input-control">
                                                <label htmlFor="specialization" className="input-label" hidden>Select Specialization</label>
                                                <select
                                                    name="specialization"
                                                    id="specialization"
                                                    className="input-field"
                                                    onChange={(e) => handleD(e)}
                                                    required
                                                >
                                                    <option value="">Select Specialization</option>
                                                    <option value="Cardiologist">Cardiologist</option>
                                                    <option value="Dermatologist">Dermatologist</option>
                                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                                    <option value="ENT Specialist">ENT Specialist</option>
                                                    <option value="Neurologist">Neurologist</option>
                                                    <option value="Ophthalmologist">Ophthalmologist</option>
                                                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                                                    <option value="Pediatrician">Pediatrician</option>
                                                    <option value="Psychiatrist">Psychiatrist</option>
                                                    <option value="Radiologist">Radiologist</option>
                                                    <option value="Urologist">Urologist</option>
                                                    <option value="Oncologist">Oncologist</option>
                                                    <option value="Endocrinologist">Endocrinologist</option>
                                                    <option value="Nephrologist">Nephrologist</option>
                                                    <option value="Pulmonologist">Pulmonologist</option>
                                                    <option value="Rheumatologist">Rheumatologist</option>
                                                    <option value="Hematologist">Hematologist</option>
                                                    <option value="Allergist/Immunologist">Allergist/Immunologist</option>
                                                    <option value="Family Medicine Physician">Family Medicine Physician</option>
                                                    <option value="General Surgeon">General Surgeon</option>
                                                    <option value="Internal Medicine Physician">Internal Medicine Physician</option>
                                                    <option value="Anesthesiologist">Anesthesiologist</option>
                                                    <option value="Emergency Medicine Physician">Emergency Medicine Physician</option>
                                                    <option value="Geriatrician">Geriatrician</option>
                                                    <option value="Nurse Practitioner">Nurse Practitioner</option>
                                                    <option value="Physician Assistant">Physician Assistant</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="input-control">
                                                <label htmlFor="name" className="input-label" hidden>License No.</label>
                                                <input
                                                    type="text"
                                                    name="license"
                                                    id="license"
                                                    className="input-field"
                                                    placeholder="License No."
                                                    onChange={(e) => handleD(e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="input-control d-flex">
                                        <div className='col-6 me-1'>
                                            <label htmlFor="select" className="input-label" hidden>Select</label>
                                            <select name="gender" id="gender" className="input-field" onChange={(e) => handle(e)} required>
                                                <option value="">Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                            </select>
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="bloodGroup" className="input-label" hidden>Blood Group</label>
                                            <select name="bloodGroup" id="bloodGroup" className="input-field" onChange={(e) => handle(e)} required>
                                                <option value="">Blood Group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="input-control">
                                        <label htmlFor="mobile" className="input-label" hidden>Mobile Number</label>
                                        <input type="tel" onChange={(e) => handle(e)} name="mob" id="mob" className="input-field" placeholder="Phone Number" required />
                                    </div>

                                    <div className="input-control w-100">
                                        <label htmlFor="date" className="input-label" hidden>Select Date</label>
                                        <DatePicker name='dob' className='input-field' placeholderText='DOB' onChange={(date) => {
                                            setStartDate(date);
                                            handle(date)
                                            console.log(startDate);
                                        }} />
                                    </div>

                                    <div className="signupbtn">
                                        <input type="button" onClick={() => { register(type) }} name="submit" className="input-submit" value="Create Account" />
                                    </div>
                                </form>
                                <div className="striped">
                                    <span className="striped-line"></span>
                                    <span className="striped-text">Or</span>
                                    <span className="striped-line"></span>
                                </div>
                                <div className="method">
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            <GoogleIcon className='fa-google' />
                                            <span>Sign in with Google</span>
                                        </a>
                                    </div>
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            <FacebookIcon className='fa-facebook' />
                                            <span>Sign in with Facebook</span>
                                        </a>
                                    </div>
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            <AppleIcon className='fa-apple' />
                                            <span>Sign in with Apple</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp

