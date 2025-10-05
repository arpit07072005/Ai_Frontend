import React from 'react'
import styles from "../css/footer.module.css"
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter,FaGithubAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function Footer() {
  return (
    <div className={styles.footer}>
    <div className={styles.left}>
        <div className={styles.logo}>AI Interviewer</div>
        <div className={styles.copyright}>© 2025 Arpit Pandey. All rights reserved.</div>
    </div>
    <div className={styles.middle}>
        <h1 className={styles.head}>Help & Support</h1>
        <li>FAQ</li>
        <li>Contact Us</li>
        <li>Give Feedback</li>
    </div>
    <div className={styles.right}>
        <h1 className={styles.links}>Connect with me</h1>
        <div className={styles.icons}>
   <a href="https://github.com/arpit07072005" target="_blank" rel="noopener noreferrer"><FaGithubAlt size={30} /></a>
   <a href="https://www.linkedin.com/in/arpit-pandey-979969301" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={30} /></a>
   <a href="https://twitter.com/arpitpandey0707" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
   <a href="mailto:arpitpandey07072005@gmail.com" target="_blank" rel="noopener noreferrer"><MdEmail size={30} /></a>
        </div>
    </div>
    </div>
  )
}

export default Footer
