import { HomePage } from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




export function App(){
  return (

    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>

  )
}




