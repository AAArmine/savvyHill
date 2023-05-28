import { useState, useEffect } from "react";
import styles from "./Clock.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const language = useSelector((state: RootState) => state.lang);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {}, [language.lang]);

  return (
    <div className={styles.clockContainer}>
      <h2>{language.lang === 1 ? "Current Time" : "Текущее время"}</h2>
      <span>{time.toLocaleTimeString()}</span>
    </div>
  );
};

export default Clock;
