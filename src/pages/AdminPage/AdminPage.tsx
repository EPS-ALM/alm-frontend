import { Container, Row } from "react-bootstrap";
import styles from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import { apiService, apiUrl } from "../../services/ApiService";
import PieChartComponent from "../../components/PieChartComponent";
import { Wallet, CashValue } from "../../services/interfaces";

const AdminPage = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [cashValue, setCashValue] = useState<CashValue>();

  useEffect(() => {
    const getData = async () => {
      apiService.get<Wallet>("/portfolio-allocation").then((res) => {
        setWallet(res);
      });

      apiService.get<CashValue>("/cash-value").then((res) => {
        setCashValue(res);
      });
    };

    getData();
  }, []);

  return (
    <Container fluid style={{ marginTop: "5rem" }} className={styles.container}>
      <h2>Administração</h2>

      <Row className="mt-3">
        <h3>Carteira</h3>
        <PieChartComponent data={wallet?.portfolio} />
      </Row>

      <Row className="mt-5">
        <h3>Índice Sharpe</h3>
        {wallet?.plotBase64 && <img src={"data:image/png;base64," + wallet?.plotBase64} />}
      </Row>

      <Row className="mt-5">
        <h3>Valor do Fundo</h3>

        <p>Investido: R$ {cashValue?.invested}</p>
        <p>Em caixa: R$ {cashValue?.inCash}</p>
      </Row>

      <Row className="mt-3" style={{ backgroundColor: "#FFFFFF" }}>
        <h3>Passivos</h3>

        <iframe
          src={`${apiUrl}/passivos`}
          title="Passivos"
          style={{ width: "100%", height: "135vh", border: "none" }}
        />
      </Row>
    </Container>
  );
};

export default AdminPage;
