import React, { useEffect, useState } from 'react'
import styles from "../css/dashboard.module.css"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { toast } from "react-toastify"
import Footer from './Footer';
import { FaEllipsis, FaThumbsUp } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import { FiAlertTriangle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { AiOutlineHistory } from "react-icons/ai";
function Dashboard() {
  const navigate = useNavigate();
  const [input, setInput] = useState("css medium")
  const [name, setName] = useState(null)
  const [dropdown, setDropdown] = useState(null)
  const [user, setUser] = useState(false);
  const [review, setReview] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/users/myself", {}, { withCredentials: true });
        setName(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        navigate('/login')
      }
    }
    user();
  }, [])

  const handlelogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/users/logout", {}, { withCredentials: true });
      toast.success("Logout successfully");
      navigate('/login')
    } catch (error) {
      toast.error("Failed to logout")
    }
  }
  const handleDelete = async (i) => {
    try {
      await axios.post("http://localhost:4000/api/v1/deleteinterview", { i: i }, { withCredentials: true });
      const updatedData = name.data.filter((_, index) => index !== i);
      setName({ ...name, data: updatedData });
      toast.success("Interview deleted successfully");
    } catch (error) {
      toast.error("Failed to delete interview");
    }
  }
const handledetailed=()=>{
 setSuggestions(false);
 setReview(true);
}
  return (
    <div className={styles.background}>
      <div className={styles.nav}>
        <div className={styles.logo}>AI Interviewer</div>
        <div className={styles.name}>
          <div className={styles.user} onClick={() => setUser(!user)}>
            {name?.username.charAt(0).toUpperCase()}
          </div>
          {user && <div className={styles.dropdownmenu}>
            <div className={styles.option}>{name?.username} </div>
            <div className={styles.option}>Profile</div>
            <div className={styles.option} onClick={handlelogout} style={{ color: 'red' }}><MdOutlineDelete fill='red' size={24} />Logout</div>
          </div>}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.dashboard}>
          <div className={styles.left}>
            <div className={styles.heading}>Ready for Your Next Practice Session?</div>
            <div className={styles.subheading}>Enter an interview type and start practicing right away.</div>
            <div className={styles.inputs}>
              <input type="text" className={styles.input} onChange={(e) => setInput(e.target.value)} placeholder='Topic - Difficulty (CSS - Medium)' /> <button className={styles.submit} onClick={() => navigate(`/ai/${input}`)}>Start New Interview</button>

            </div>
          </div>
          <div className={styles.right}>
            <img src="ai1.png" alt="Ai" />
          </div>
        </div>
        <div className={styles.heading1}>Your Previous Interviews</div>
        <div className={styles.options}>
          {(name?.data?.length) > 0 ? (name.data.map((item, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.cross} onClick={() => setDropdown(dropdown === i ? null : i)}><FaEllipsis size={20} /></div>
              <div className={styles.head}>{item.topic.toUpperCase()}</div>
              <div className={styles.date}>{item.date}</div>
              <div className={styles.score}>
                <div>Overall Score:</div>
                <div className={styles.number}>{item.analysis.score}%</div>
              </div>
              <button className={styles.review} onClick={() => setSuggestions(true)}>Review Feedback</button>
              {dropdown === i && <div className={styles.dropdown}>
                <div className={styles.option1} onClick={() => setReview(true)}><LiaEyeSolid size={24} />Review Interview</div>
                <div className={styles.option2} onClick={() => handleDelete(i)}><MdOutlineDelete fill='red' size={24} />Delete</div>
              </div>}
              {review && <div className={styles.review2}>
                <div className={styles.reviewcontent}>
                  <h2>Review: {item.topic.toUpperCase()}</h2>
                  <div className={styles.cross1} onClick={() => setReview(false)}><ImCross /></div>
                  {item.qa.map((qa, index) => (
                    <div className={styles.qhead} key={index}>
                      <div className={styles.question}><span>Question {index + 1}:</span> {qa?.question}</div>
                      <div className={styles.question}><span>Answer:</span> {qa?.userAnswer}</div>
                      <div className={styles.question}><span>AI Feedback:</span> {qa.aiResponse}</div>
                    </div>

                  ))}
                  <button className={styles.close} onClick={() => setReview(false)}>Close</button>
                </div>
              </div>}
              {suggestions && <div className={styles.suggestions}>
                <h2>Review: {item.topic.toUpperCase()}</h2>
                <div className={styles.top}>
                  <div className={styles.topleft}>
                    <div className={styles.userscore}>{item.analysis.score}%</div>
                    <div>overall score</div>
                  </div>
                  <div className={styles.topright}>
                    {item.analysis.feedback}
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.contentleft}>
                    <div className={styles.thumbsup} style={{ color: 'rgb(34, 197, 94)' }}><FaThumbsUp fill='rgb(34, 197, 94)' /> Strongest</div>

                    {item.analysis.strongest}
                  </div>
                  <div className={styles.contentright}>
                    <div className={styles.thumbsup} style={{ color: 'rgb(245, 158, 11)' }}><FiAlertTriangle fill='rgb(245, 158, 11)' /> Weakest</div>
                    {item.analysis.weakest}
                  </div>
                </div>
                <div className={styles.bottom}>
                  <button className={styles.close2} onClick={() => setSuggestions(false)}>Close</button>
                  <button className={styles.detailed} onClick={handledetailed}><FaRegFileAlt fill='rgb(45, 212, 191)' />View Detailed Q&A</button>
                </div>
                  <div className={styles.cross1} onClick={() => setSuggestions(false)}><ImCross /></div>
              </div>}
            </div>
          ))) : (<div className={styles.card}>
            <div className={styles.iconhistory}><AiOutlineHistory size={50} fill='#9CA3AF' /></div>
            <div className={styles.notfound}>No Interview History</div>
            <p>Complete session to see your scores and feedback here.</p>
          </div>)
          }
        </div>
        <div className={styles.heading1}>Practice More</div>
        <div className={styles.options}>

          <div className={styles.card}>
            <div className={styles.head}>React JS</div>
            <div className={styles.dis}>
              Learn React fundamentals, hooks, state management, and component lifecycle to build modern UIs.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/react js medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>Next JS</div>
            <div className={styles.dis}>
              Understand server-side rendering, static site generation, and API routes for scalable web apps.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/next js medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>HTML</div>
            <div className={styles.dis}>
              Master semantic tags, forms, media elements, and best practices for accessible web design.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/html medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>CSS</div>
            <div className={styles.dis}>
              Dive into Flexbox, Grid, animations, and responsive design to create beautiful layouts.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/css medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>Express JS</div>
            <div className={styles.dis}>
              Build RESTful APIs, middleware, and handle authentication with Express and Node.js.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/express js medium`)}>Practice Now</button>
          </div>
          <div className={styles.card}>
            <div className={styles.head}>JavaScript</div>
            <div className={styles.dis}>
              Strengthen your JavaScript fundamentals, ES6+ features, and asynchronous programming skills.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/javascript medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>Node.js</div>
            <div className={styles.dis}>
              Learn event-driven programming, streams, and building scalable backend services using Node.js.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/node js medium`)}>Practice Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.head}>MongoDB</div>
            <div className={styles.dis}>
              Understand NoSQL concepts, CRUD operations, schema design, and aggregation in MongoDB.
            </div>
            <button className={styles.send} onClick={() => navigate(`/ai/mongodb medium`)}>Practice Now</button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
