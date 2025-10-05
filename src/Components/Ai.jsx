import React, { useEffect, useState } from "react";
import styles from "../css/ai.module.css";
import axios from "axios";
import { IoPersonSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Ai() {
  const { data } = useParams();
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [responseai, setResponseai] = useState(""); //thinking or ready to listen
  const [activeai, setActiveai] = useState(false);
  const [activeyou, setActiveyou] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      handleQuestion(data);
    }
  }, []);
  let recognition;

  const handleQuestion = async (data) => {

    setResponseai("Thinking...");
    await setActiveai(true);
    try {
      const response = await axios.post("http://localhost:4000/api/v1/question", {
        topic: data,
      }, { withCredentials: true });
      const ques = response.data.question;
      // console.log("AI Question:", ques);
      speakQuestion(ques);
      setQuestion(ques);
      setAns(ques);
    } catch (error) {
      navigate("/login");
    }
  };
  const startListening = () => {
    setActiveyou(true);
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setAns(transcript.trim());
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    recognition.onend = () => {
      // console.log("Listening stopped...");
    };
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setActiveyou(false);
    }
  };
  const handleSubmitAnswer = async () => {
    stopListening();
    setActiveyou(false)
    setResponseai("Thinking...");
    setActiveai(true);
    try {
      const response = await axios.post("http://localhost:4000/api/v1/evaluate", {
        userQuestion: question,
        userAnswer: ans,
      }, { withCredentials: true });
      const answer = response.data.answer;
      // console.log("User Answer:", ans);
      // console.log("AI Response:", answer);
      setResponseai("");
      setAns(answer);
      speakAnswer(answer);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    speech.onend = () => {
      setResponseai("Ready to listen.");
      setActiveai(false);
    }
  };

  const speakAnswer = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;

    speech.onend = () => {
      const text = "Let's move on to the next question."
      speakQuestion(text);
      setTimeout(() => {
        handleQuestion(data);
      }, 2000);
    };
    window.speechSynthesis.speak(speech);
  };
  const stop = async () => {
    window.speechSynthesis.cancel();
    try {
      await toast.promise(
      axios.post("http://localhost:4000/api/v1/endInterview", {}, { withCredentials: true }),
      {
        pending: "Interview is being saved...",
        success: "Interview saved successfully ",
        error: "Failed to save interview ",
      }
    );
      navigate('/');

    } catch (error) {
      console.log("error aa gaya!")
    }
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.heading}>AI Interviewer</h1>
        <p className={styles.subheading}>Get ready to practice your interview!</p>
        <div className={styles.cardcont}>
          <div className={styles.ai}>
            <div className={`${styles.image1} ${activeai ? styles.active : ""}`}>
              <IoPersonSharp size={60} />
            </div>
            <div className={styles.identity}>AI Interviewer</div>
            <div className={styles.response}>{responseai}</div>
          </div>
          <div className={styles.you}>
            <div className={`${styles.image2} ${activeyou ? styles.active : ""}`}>

              <IoPersonSharp size={60} />
            </div>
            <div className={styles.identity}>You</div>
          </div>
        </div>
        <div className={styles.message}>{ans}</div>
        <div className={styles.buttons}>
          <button className={styles.submit} onClick={startListening}><FaMicrophone />Start Listening</button>
          <button className={styles.submit} onClick={handleSubmitAnswer}>Submit Answer</button>
          <button className={styles.end} onClick={stop}>End</button>
        </div>
      </div>
    </div>
  );
}

export default Ai;
