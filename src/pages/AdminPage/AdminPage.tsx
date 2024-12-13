import { Container, Row } from "react-bootstrap";
import styles from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import { apiService } from "../../services/ApiService";

interface Wallet {}
interface CashValue {}

const AdminPage = () => {
  const [wallet, setWallet] = useState<any | Wallet>({});
  const [cashValue, setCashValue] = useState<any | CashValue>({});

  useEffect(() => {
    const getData = () => {
      apiService.get("/portfolio-allocation").then((res) => {
        setWallet(res);
      });

      apiService.get("/cash-value").then((res) => {
        setCashValue(res);
      });
    };
    getData();
  }, []);

  return (
    <Container fluid style={{ marginTop: "5rem" }} className={styles.container}>
      <h2>Administração</h2>

      <Row className="mt-5">
        <h3>Ativos</h3>
        {JSON.stringify(wallet.portfolio)}
        gráfico de pizza
        <h3>Índice Sharpe</h3>
        <img src={"data:image/png;base64," + wallet.plotBase64} />
      </Row>

      <Row className="mt-5">
        <h3>Total Investido no Fundo</h3>

        <p>Investido: {cashValue.invested}</p>
        <p>Em caixa: {cashValue.inCash}</p>
      </Row>
    </Container>
  );
};

export default AdminPage;
