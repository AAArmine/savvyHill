import styles from "./Heading.module.scss";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { changeLang } from "../../redux/slices/langSlice";
import Clock from "../clock";

const Heading = () => {
  const [lang, setLang] = useState<number>(1);

  const dispatch = useDispatch();
  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = Number(event.target.value);
    setLang(selectedLang);
    dispatch(changeLang(selectedLang));
  };

  return (
    <section className={styles.headingContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.clock}>
          <Clock />
        </div>
        <select
          name="languages"
          id="lang"
          onChange={handleLangChange}
          value={lang}
        >
          <option value={1}>EN</option>
          <option value={2}>RU</option>
        </select>
      </div>
    </section>
  );
};

export default Heading;
