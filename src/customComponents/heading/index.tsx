import React from "react";
import styles from "./Heading.module.scss";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { changeLang } from "../../redux/slices/langSlice";
import Clock from "../clock";

interface HeadingProps {
  lang: number;
  changeLang: (lang: number) => void;
}

interface HeadingState {
  lang: number;
}

class Heading extends React.Component<HeadingProps, HeadingState> {
  constructor(props: HeadingProps) {
    super(props);
    this.state = {
      lang: props.lang,
    };
  }

  handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = Number(event.target.value);
    this.setState({ lang: selectedLang });
    this.props.changeLang(selectedLang);
  };

  render() {
    const { lang } = this.state;

    return (
      <section className={styles.headingContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.clock}>
            <Clock />
          </div>
          <select
            name="languages"
            id="lang"
            onChange={this.handleLangChange}
            value={lang}
          >
            <option value={1}>EN</option>
            <option value={2}>RU</option>
          </select>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    lang: state.lang.lang, 
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLang: (lang: number) => dispatch(changeLang(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heading);
