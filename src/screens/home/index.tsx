import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { feedbackItem } from "../../types";
import Heading from "../../customComponents/heading";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.png";

const Home = () => {
  const [data, setData] = useState<feedbackItem[]>();
  const language = useSelector((state: RootState) => state.lang);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data.json`);
        const jsonData = await response.json(); // Parse the response as JSON
        console.log(jsonData);

        language.lang === 1
          ? setData(Object.values(jsonData.en))
          : setData(Object.values(jsonData.ru));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [language.lang]);

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span>{name}</span>,
    },
    {
      dataIndex: "review",
      key: "review",
      render: (review: string) => <span>{review}</span>,
    },

    {
      dataIndex: "date",
      key: "date",
      render: (date: string) => <span>{date}</span>,
    },
    {
      dataIndex: "go",
      key: "go",
      render: (_: any, record: feedbackItem) => (
        <span
          onClick={() => {
            navigate(`/${record.name}`, {
              state: { record },
            });
          }}
        >
          <img src={arrow} alt="arrow" />
        </span>
      ),
    },
  ];
  return (
    <div className={styles.layoutContainer}>
      <Heading />
      <div>
        <div className={styles.tableContainer}>
          <Table
            dataSource={data}
            columns={columns}
            className={styles.tableComponent}
            showHeader={false}
            pagination={{
              pageSize: 5,
              position: ["bottomCenter"],
              showLessItems: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
