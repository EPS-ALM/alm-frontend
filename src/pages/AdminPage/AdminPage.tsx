import { Container, Row, Tabs, Tab } from "react-bootstrap";
import styles from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import { apiService, apiUrl } from "../../services/ApiService";
import PieChartComponent from "../../components/PieChartComponent";
import { Wallet, CashValue } from "../../services/interfaces";

const AdminPage = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [cashValue, setCashValue] = useState<CashValue>();
  const [riskReports, setRiskReports] = useState<any>([]);

  const RISKS_REPORTS = [
    "investment_risk2",
    "investment_risk",
    "interest_rate_risk_liability",
    "interest_rate_risk_assets",
    "crypto_risk2",
    "country_risk",
    "country_risk",
  ];

  useEffect(() => {
    const getData = async () => {
      apiService.get<Wallet>("/portfolio-allocation").then((res) => {
        setWallet(res);
      });

      apiService.get<CashValue>("/cash-value").then((res) => {
        setCashValue(res);
      });

      const reports = await Promise.all(
        RISKS_REPORTS.map(async (report) => {
          const res = await apiService.get<any>(`/riskNotebook?notebookName=${report}`);
          return res.notebook_html;
        })
      );

      setRiskReports(reports);
    };

    getData();
  }, []);

  return (
    <Container fluid style={{ marginTop: "5rem" }} className={styles.container}>
      <h2>Administração</h2>

      {/* Tabs para dividir os conteúdos */}
      <Tabs defaultActiveKey="assets" id="admin-tabs">
        {/* Aba Ativos e Carteira */}
        <Tab eventKey="assets" title="Ativos e Carteira">
          <Row className="mt-3">
            <h3>Carteira</h3>
            <PieChartComponent data={wallet?.portfolio} />
          </Row>
          <Row className="mt-5">
            <h3>Índice Sharpe</h3>
            {wallet?.plotBase64 && (
              <img style={{ width: "60%" }} src={"data:image/png;base64," + wallet?.plotBase64} />
            )}
          </Row>
          <Row className="mt-5">
            <h3>Valor do Fundo</h3>
            <p>
              Investido:{" "}
              {cashValue?.invested?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <p>
              Em caixa:{" "}
              {cashValue?.inCash?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </Row>
        </Tab>

        {/* Aba Passivos */}
        <Tab eventKey="liabilities" title="Passivos">
          <Row className="mt-3">
            <div style={{ backgroundColor: "#FFFFFF" }}>
              <iframe
                src={`${apiUrl}/passivos`}
                title="Passivos"
                style={{ width: "100%", height: "90vh", border: "none" }}
              />
            </div>
          </Row>

          {/* Sub-aba para os relatórios de passivos */}
          <h3 className="mt-5">Relatórios de Passivos</h3>
          <Tabs defaultActiveKey="report_0" id="risk-reports">
            {riskReports.map((report: any, index: number) => (
              <Tab eventKey={`report_${index}`} title={`Relatório ${index + 1}`} key={index}>
                <Row className="mt-3">
                  <div style={{ backgroundColor: "#FFFFFF" }}>
                    <iframe
                      key={index}
                      srcDoc={report}
                      title={`report_${index}`}
                      style={{ width: "100%", height: "80vh", border: "none" }}
                    />
                  </div>
                </Row>
              </Tab>
            ))}
          </Tabs>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPage;
