import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import Sidebar from '../Sidebar/Sidebar';
import DocSidebar from '../Sidebar/DocSidebar';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./DashboardProfile.css";

const DashboardProfile = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const isDoctorDashboard = location.pathname.startsWith('/doc/dashboard');
  const [cookies] = useCookies(['hash']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies['hash']) { 
          const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cookies['hash']}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [cookies]);

  return (
    <>
      {isDoctorDashboard ? <DocSidebar /> : <Sidebar />}
      <div className='profile'>
        <div className="headingCard">
          <p>Profile</p>
        </div>
        <div className="profile-section">
          <div className="profile-name">
            <div className="profile-image" style={{ fontSize: 70 }}>
              <FaUser />
            </div>
            <div className="user-name">
              <p>{userData ? userData.name : 'Loading...'}</p>
            </div>
          </div>
          <div className="profile-data">
            <div className="user-name">
              <p>Info</p>
            </div>

            <div className='break-line'></div>

            {userData && (
              <>
                <div className="info-div">
                  <div className="infoParameter">Name:</div>
                  <div className="infoData">{userData.name}</div>
                </div>
                <div className="info-div">
                  <div className="infoParameter">Email:</div>
                  <div className="infoData">{userData.mail}</div>
                </div>
                <div className="info-div">
                  <div className="infoParameter">Phone:</div>
                  <div className="infoData">{userData.mob}</div>
                </div>
                <div className="info-div">
                  <div className="infoParameter">Gender:</div>
                  <div className="infoData">{userData.gender}</div>
                </div>
                <div className="info-div">
                  <div className="infoParameter">Date of Birth:</div>
                  <div className="infoData">{userData.dob}</div>
                </div>
                <div className="info-div">
                  <div className="infoParameter">Blood group:</div>
                  <div className="infoData">{userData.bloodGroup}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
