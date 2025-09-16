import { About } from './Pages/About';
import { HomePage } from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TermsAndConditions } from './Pages/TermsAndConditions';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';




export function App(){
  return (

    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/terms' element={<TermsAndConditions/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
      </Routes>
    </Router>

  )
}




