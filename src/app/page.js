"use client";
import styles from "./page.module.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import modelList from "./model.json";
import { useEffect, useState } from "react";
import LoadingDots from "./loadingDots";
import Modal from "./components/modal/Modal";

export default function Home() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const handleClear = () => {
    setText("");
  };

  useEffect(() => {
    setVoices(modelList["voices_list"]);
  }, []);

  useEffect(() => {
    const filtered = voices.filter(
      (voice) =>
        (selectedGender ? voice.gender === selectedGender : true) &&
        (selectedLanguage ? voice.language === selectedLanguage : true) &&
        (selectedCountry ? voice.country === selectedCountry : true)
    );
    setFilteredModels(filtered);
  }, [selectedGender, selectedLanguage, selectedCountry, voices]);

  const handleGetAudio = async () => {
    if (!model) {
      setMessage("Please select a model...");
      return;
    }

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/getSpeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice: model,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed...");
      }

      const data = await response.json();

      if (data && data.downloadUrl) {
        setUrl(data.downloadUrl);
        setShowModal(true);
        setText("");
      } else {
        throw new Error("Invalid response format...");
      }
    } catch {
      setMessage("Failed to fetch...");
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueValues = (key) => [...new Set(voices.map((voice) => voice[key]))];

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.toolbar}>
            <button className={styles.toolbarButton} onClick={handleClear}>
              Clear
            </button>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.controls}>
          <select
            className={styles.dropdown}
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            {uniqueValues("gender")
              .sort()
              .map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
          </select>

          <select
            className={styles.dropdown}
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {uniqueValues("language")
              .sort()
              .map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
          </select>

          <select
            className={styles.dropdown}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {uniqueValues("country")
              .sort()
              .map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
          </select>

          <select
            className={styles.dropdown}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">Select Model</option>
            {filteredModels.map((voice, index) => (
              <option key={index} value={voice.voice_name}>
                {voice.description}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.cta}>
          <div className={styles.msg}>{message}</div>
          <button
            className={styles.button}
            onClick={handleGetAudio}
            disabled={isLoading}
          >
            {isLoading ? <LoadingDots /> : "Get Audio"}
          </button>
        </div>
      </div>
      {showModal && url && <Modal setShowModal={setShowModal} url={url} />}{" "}
      <Footer />
    </div>
  );
}
