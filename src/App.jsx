import { About } from './Pages/About';
import { HomePage } from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TermsAndConditions } from './Pages/TermsAndConditions';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import { Contact } from './Pages/Contact';
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
      </Routes>
    </Router>

  )
}




