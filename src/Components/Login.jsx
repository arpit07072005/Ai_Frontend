
import { Link, useNavigate } from "react-router-dom"
import styles from "../css/login.module.css"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
function Login() {
  const [email ,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate();
  const handleClick =async ()=>{
    try {
      const response = await axios.post('https://ai-backend-2r4k.onrender.com/api/v1/users/login',{
        email:email,
        password:password
      },{withCredentials:true})
      toast.success("Login successful!")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Login Failed");
    }
  }
  return (
    <div className= {styles.background}>
      <div className={styles.login}>
        <h3 className={styles.heading}>Login</h3>
        <p className={styles.para}>Your AI partner for job interview practice</p>
       
        <label htmlFor="email">Email</label>
        <input type="text" id='email'className={styles.input} onChange={(e)=>setEmail(e.target.value)}/>
      
       <label htmlFor="password">Password</label>
        <input type="password" id='password'className={styles.input} onChange={(e)=>setPassword(e.target.value)}/>
       
        <button className={`${styles.input} ${styles.button}`}onClick={handleClick}>Sign in</button>
        <p className={styles.bottom}>First time?<Link to='/signup'>Sign up</Link>  for free</p>
      </div>
    </div>
  )
}

export default Login
