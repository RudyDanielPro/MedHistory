import { About } from './Pages/About';
import { HomePage } from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TermsAndConditions } from './Pages/TermsAndConditions';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import { Contact } from './Pages/Contact';
import { StudentDashboard } from './Pages/StudentDashboard';
import { StudentNotifications } from './Pages/StudentNotifications';
import { StudentProfile } from './Pages/StudentProfile';
import { DoctorDashboard } from './Pages/DoctorDashboard';
import { DoctorProfile } from './Pages/DoctorProfile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './Pages/Login';




export function App(){
  return (

    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/terms' element={<TermsAndConditions/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />

      </Routes>
    </Router>

  )
}




