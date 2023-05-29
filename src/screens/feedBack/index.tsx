import { Component } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Feedback.module.scss";
import arrow from "../../assets/images/arrow.png";
import { feedbackItem } from "../../types";

interface FeedbackProps {}

interface FeedbackState {
  redirect: boolean;
  record?: feedbackItem;
}

class Feedback extends Component<FeedbackProps, FeedbackState> {
  state: FeedbackState = {
    redirect: false,
    record: undefined,
  };

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  componentDidMount() {
    const storedRecord = localStorage.getItem("record");
    if (storedRecord) {
      const record = JSON.parse(storedRecord) as feedbackItem;
      this.setState({ record });
    }
  }
  componentWillUnmount() {
    localStorage.removeItem("record");
  }

  render() {
    const { redirect, record } = this.state;
    if (redirect) {
      return <Navigate to="/" replace={true} />;
    }

    return (
      <div className={styles.layoutContainer}>
        <div>
          <div className={styles.userDataCont}>
            {record && (
              <>
                <h1>{record.name}</h1>
                <p>{record.review}</p>
                <span>{record.date}</span>
              </>
            )}
          </div>
          <span onClick={this.handleRedirect}>
            <img src={arrow} alt="arrow" />
          </span>
        </div>
      </div>
    );
  }
}

export default Feedback;
