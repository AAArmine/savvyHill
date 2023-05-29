import React from "react";
import styles from "./Clock.module.scss";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";

interface ClockProps {
  lang: number;
}

interface ClockState {
  time: Date;
}

class Clock extends React.Component<ClockProps, ClockState> {
  private interval: NodeJS.Timeout | undefined;

  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { time } = this.state;
    const { lang } = this.props;

    return (
      <div className={styles.clockContainer}>
        <h2>{lang === 1 ? "Current Time" : "Текущее время"}</h2>
        <span>{time.toLocaleTimeString()}</span>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    lang: state.lang.lang,
  };
};

export default connect(mapStateToProps)(Clock);
