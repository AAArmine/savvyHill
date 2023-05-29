import { Component } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Home from "./screens/home";
import FeedBack from "./screens/feedBack";
import { connect } from "react-redux";
import { RootState } from "./redux/store";

interface AppProps {
  language: number;
}

class App extends Component<AppProps> {
  render() {
    const { language } = this.props;

    return (
      <Routes>
        <Route path="/" element={<Home lang={language} />} />
        <Route path="/:name" element={<FeedBack />} />
      </Routes>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.lang.lang,
  };
};

export default connect(mapStateToProps)(App);
