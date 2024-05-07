import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import AboutPage from './components/AboutPage/AboutPage';
import ServicesPage from './components/ServicesPage/ServicesPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import DashboardProfile from './components/Dashboard/DashboardProfile';
import MakeAppointment from './components/Appointment/MakeAppointment';
import Appointments from './components/Appointment/Appointments';
import Insurance from './components/HealthRecords/Insurance';
import Allergies from './components/HealthRecords/Allergies';
import MedicalHistory from './components/HealthRecords/MedicalHistory';
import HospitalHistory from './components/HealthRecords/HospitalHistory';
import VaccinationRecords from './components/HealthRecords/VaccinationRecords';
import Request from './components/HealthRecords/Request';
import ApprovedRequests from './components/HealthRecords/ApprovedRequests';
import InsuranceForm from './components/HealthRecords/InsuranceForm';
import AllergiesForm from './components/HealthRecords/AllergiesForm';
import MedicalHistoryForm from './components/HealthRecords/MedicalHistoryForm';
import HospitalHistoryForm from './components/HealthRecords/HospitalHistoryForm';
import VaccinationRecordsForm from './components/HealthRecords/VaccinationRecordsForm';
import DocAppointments from './components/Appointment/DocAppointments';
import PatientList from './components/Appointment/PatientList';
import PatientRecords from './components/HealthRecords/PatientRecords';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Patient Routes */}

          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/make-appointment" element={<MakeAppointment />} />
          <Route path="/dashboard/appointment" element={<Appointments />} />
          <Route path="/dashboard/insurance" element={<Insurance />} />
          <Route path="/dashboard/insuranceForm" element={<InsuranceForm />} />
          <Route path="/dashboard/allergies" element={<Allergies />} />
          <Route path="/dashboard/allergiesForm" element={<AllergiesForm/>} />
          <Route path="/dashboard/medical-history" element={<MedicalHistory />} />
          <Route path="/dashboard/medical-historyForm" element={<MedicalHistoryForm />} />
          <Route path="/dashboard/hospitalization-history" element={<HospitalHistory />} />
          <Route path="/dashboard/hospitalization-historyForm" element={<HospitalHistoryForm />} />
          <Route path="/dashboard/vaccination-record" element={<VaccinationRecords />} />
          <Route path="/dashboard/vaccination-recordForm" element={<VaccinationRecordsForm />} />
          <Route path="/dashboard/requests" element={<Request />} />
          <Route path="/dashboard/approved-requests" element={<ApprovedRequests />} />

          {/* Doctor Routes */}
          <Route path="doc/dashboard/profile" element={<DashboardProfile />} />
          <Route path="doc/dashboard/appointment" element={<DocAppointments />} />
          <Route path="doc/dashboard/patient" element={<PatientList />} />
          <Route path="doc/dashboard/patient/:patientHash" element={<PatientRecords/>} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
