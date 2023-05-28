import styles from "./Feedback.module.scss";
import { useLocation } from "react-router-dom";
import { locationStateUserData } from "../../types";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.png";

const FeedBack = () => {
  const location = useLocation();
  const userData = location.state as locationStateUserData;
  const navigate = useNavigate();

  return (
    <div className={styles.layoutContainer}>
      <div>
        <div className={styles.userDataCont}>
          <h1>{userData.record.name}</h1>
          <p>"{userData.record.review}"</p>
          <span>{userData.record.date}</span>
        </div>
        <span
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img src={arrow} alt="arrow" />
        </span>
      </div>
    </div>
  );
};

export default FeedBack;
