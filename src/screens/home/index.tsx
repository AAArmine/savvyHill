import { Component } from "react";
import { feedbackItem } from "../../types";
import Heading from "../../customComponents/heading";
import { Table } from "antd";
import arrow from "../../assets/images/arrow.png";
import styles from "./Home.module.scss";
import { Navigate } from "react-router-dom";

interface HomeProps {
  lang: number;
}

interface HomeState {
  data: feedbackItem[] | undefined;
  redirect: boolean;
  record: feedbackItem | null;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      data: undefined,
      redirect: false,
      record: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: HomeProps) {
    if (prevProps.lang !== this.props.lang) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { lang } = this.props; 

    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data.json`);
      const jsonData = await response.json();

      const data =
        lang === 1
          ? Object.values<feedbackItem>(jsonData.en)
          : Object.values<feedbackItem>(jsonData.ru);

      this.setState({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleNavigate = (record: feedbackItem) => {
    this.setState({ redirect: true, record });
    localStorage.setItem("record", JSON.stringify(record));
  };
  render() {
    const { data, redirect, record } = this.state;

    if (redirect && record) {
      return (
        <Navigate to={`/${record.name}`} replace={true} state={{ record }} />
      );
    }
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (name: string) => {
          const arr = name.split(" ");
          return <span>{`${arr[0]} ${arr[1][0]}.`}</span>;
        },
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
          <span onClick={() => this.handleNavigate(record)}>
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
              className="tableComponent"
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
  }
}

export default Home;
