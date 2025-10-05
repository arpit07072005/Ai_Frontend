import React, { useState } from 'react'
import styles from "../css/login.module.css"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
function Signup() {
  const [name,setName]=useState("");
  const [mobile , setMobile]=useState("");
  const [email , setEmail]=useState("");
  const [password, setPassword]= useState("");
  const navigate = useNavigate();
  const handleClick= async()=>{
    try {
      const response = await axios.post('https://ai-backend-2r4k.onrender.com/api/v1/users/signup',{
         username: name,
        email:email,
        password:password,
        mobileno:mobile,
      } )
      toast.success("signup successful!")
      navigate('/login');

    } catch (error) {
      console.log(error);
      toast.error("signup failed")
    }
  }
  return (
    <div className= {styles.background}>
      <div className={styles.login}>
        <h3 className={styles.heading}>Signup</h3>
        <p className={styles.para}>Sign up to unlock personalized interview prep.</p>
        
        <label htmlFor="name">Full Name</label>
        <input type="text" id='name'className={styles.input} onChange={(e)=>setName(e.target.value)}/>
       
       
        <label htmlFor="number">Mobile no</label>
        <input type="text" id='number'className={styles.input} onChange={(e)=>setMobile(e.target.value)}/>
        
        <label htmlFor="email">Email</label>
        <input type="text" id='email'className={styles.input} onChange={(e)=>setEmail(e.target.value)}/>
       
        <label htmlFor="password">Password</label>
        <input type="password" id='password'className={styles.input} onChange={(e)=>setPassword(e.target.value)}/>
        
        <button className={`${styles.input} ${styles.button}` } onClick={handleClick}>Create an Account</button>
        <p className={styles.bottom}>Have an account already?<Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default Signup
