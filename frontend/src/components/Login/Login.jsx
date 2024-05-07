import React, { useState, useEffect } from 'react'
import "./Login.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Web3 from "web3";
import contract from "../../contracts/Cruds.json";
import { useCookies } from "react-cookie";
import axios from "axios"


function Login() {
    const [type, setType] = useState(false);
    const [cookies, setCookie] = useCookies([]);
    const [log, setLog] = useState({
        mail: "",
        password: ""
    });

    const navigate = useNavigate();

    // const web3 = new Web3(window.ethereum);
    // const mycontract = new web3.eth.Contract(
    //     contract["abi"],
    //     contract["address"]
    // );

    function handle(e) {
        const newData = { ...log };
        newData[e.target.name] = e.target.value;
        setLog(newData);
    }

    async function login(e) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        if (!e) {
            // Patient
            try {
                const patients = await mycontract.methods.getPatient().call();
                for (let i = patients.length - 1; i >= 0; i--) {
                    const ipfsData = await axios.get(`https://gateway.pinata.cloud/ipfs/${patients[i]}`);
                    const data = ipfsData.data;
                    if (data.mail === log.mail && data.password === log.password) {
                        setCookie('hash', patients[i]);
                        setCookie('type', 'patient');
                        alert("Logged in");
                        navigate("/dashboard/profile")
                        return;
                    }
                }
                alert("Invalid email or password");
            } catch (error) {
                console.error('Error retrieving patients from blockchain:', error);
            }
        } else {
            // Doctor
            try {
                const doctors = await mycontract.methods.getDoctor().call();
                console.log("This is DOC:", doctors)
                for (let i = doctors.length - 1; i >= 0; i--) {
                    const ipfsData = await axios.get(`https://gateway.pinata.cloud/ipfs/${doctors[i]}`);
                    const data = ipfsData.data;
                    if (data.mail === log.mail && data.password === log.password) {
                        setCookie('hash', doctors[i]);
                        setCookie('type', 'doctor');
                        alert("Logged in");
                        navigate("/doc/dashboard/profile")
                        return;
                    }
                }
                alert("Invalid email or password");
            } catch (error) {
                console.error('Error retrieving doctors from blockchain:', error);
            }
        }
    }



    return (
        <>
            <div className="signIn heroSection">
                <Navbar />
                <div className="page">
                    <div className="login">
                        <div className="container">
                            <div className="wrapper">
                                <div className="heading">
                                    <h1 className="text text-large">Sign In</h1>
                                    <p className="text text-normal">New user? <span><a href="/signup" className="text text-links">Create an account</a></span>
                                    </p>
                                </div>
                                <form name="signin" className="form">
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
                                    <div className="input-control">
                                        <label htmlFor="email" className="input-label" hidden>Email Address</label>
                                        <input type="email" onChange={(e) => handle(e)} name="mail" id="email" className="input-field" placeholder="Email Address" />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="password" className="input-label" hidden>Password</label>
                                        <input type="password" onChange={(e) => handle(e)} name="password" id="password" className="input-field" placeholder="Password" />
                                    </div>
                                    <div className="input-control">
                                        <a href="#" className="text text-links">Forgot Password</a>
                                        <div className="signupbtn">
                                            <input type="button" onClick={() => { login(type) }} name="submit" className="input-submit" value="Login" />
                                        </div>
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

export default Login