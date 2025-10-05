import './App.css'
import '../src/index.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Ai from './Components/Ai'
import Dashboard from './Components/Dashboard'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
     <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/ai/:data' element={<Ai/>}/>
      <Route path='/signup' element={  <Signup/>}/>
      <Route path='/login' element={  <Login/>}/>
     </Routes>
           <ToastContainer />
     </BrowserRouter>
     </>
  )
}

export default App
