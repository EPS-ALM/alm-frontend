import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import instagram from "../../assets/instagram.png";
import youtube from "../../assets/youtube.png";
import facebook from "../../assets/facebook.png";
import logo from "../../assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ marginTop: "5rem" }} className={styles.container} fluid>
        <Row className="text-center justify-content-center gap-3">
          <h2 className="w-50">Invista com Confiança. Planeje o Futuro que Você Merece.</h2>

          <p className="w-50" style={{ zIndex: 1 }}>
            Descubra como a nossa plataforma baseada em inteligência artificial pode ajudar você a
            alcançar seus objetivos financeiros com segurança e simplicidade. Converse com nosso
            chatbot e crie a estratégia de investimento ideal para sua aposentadoria.
          </p>

          <div className="d-flex justify-content-center">
            <Button
              className={styles.mainButton}
              size="lg"
              variant="primary"
              onClick={() => navigate("/simulacao")}
            >
              Começar agora
            </Button>
          </div>
        </Row>

        <img className={styles.arrow} src={arrow} />
        <Row className={`${styles.rectangleArea} justify-content-center gap-3`}>
          <Col>
            <Card className={`${styles.retangle} text-center`}>Simplicidade</Card>
          </Col>

          <Col>
            <Card className={`${styles.retangle} text-center`}>Segurança</Card>
          </Col>

          <Col>
            <Card className={`${styles.retangle} text-center`}>Previsibilidade</Card>
          </Col>

          <Col>
            <Card className={`${styles.retangle} text-center`}>Lucro</Card>
          </Col>
        </Row>
      </Container>

      <Container className={styles.container} fluid>
        <Row className="text-center justify-content-center gap-3">
          <h2>Como funciona nossa solução?</h2>

          <Row className="justify-content-center gap-3 mt-3">
            <Col>
              <Card className={`${styles.retangleCard}`}>
                <Card.Title className="mb-4">Balanceamento de ativos</Card.Title>
                Mantenha o equilíbrio ideal entre segurança e crescimento. Nossa plataforma ajusta
                sua carteira automaticamente, garantindo que seus ativos estejam sempre alinhados às
                suas metas financeiras.
              </Card>
            </Col>

            <Col>
              <Card className={`${styles.retangleCard}`}>
                <Card.Title className="mb-4">Rentabilidade fixa</Card.Title>
                Invista com tranquilidade em opções de rendimento fixo, que oferecem previsibilidade
                e estabilidade para o seu planejamento financeiro.
              </Card>
            </Col>

            <Col>
              <Card className={`${styles.retangleCard}`}>
                <Card.Title className="mb-4">Acompanhamento em Tempo Real</Card.Title>
                Monitore seus investimentos e veja seu progresso sempre que quiser, de forma simples
                e transparente.
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>

      <Container id="duvidas" className={styles.container} fluid>
        <Row className="text-center justify-content-center gap-3">
          <h2 className="mb-4">Dúvidas frequentes</h2>
          <Accordion className={`${styles.customAccordion}`} flush>
            <Accordion.Item className={styles.accordionItem} eventKey="0">
              <Accordion.Header>Qual é a rentabilidade prometida?</Accordion.Header>
              <Accordion.Body>
                Nossa plataforma promete uma rentabilidade fixa de 0.9% por mês nos primeiros 3
                anos. A cada 3 anos conosco, a rentabilidade sobre 0.1%! Buscamos oferecer o melhor
                retorno possível apesar das circunstâncias de mercado. Mas é importante lembrar que
                os investimentos estão sujeitos a riscos e variáveis do mercado.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey="1">
              <Accordion.Header>Em quais ativos meu dinheiro será investido?</Accordion.Header>
              <Accordion.Body>
                O seu dinheiro será alocado em uma carteira diversificada composta por ativos de
                renda fixa, fundos de investimento e outros instrumentos financeiros adequados ao
                seu perfil. Essa estratégia visa equilibrar segurança e rentabilidade.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey="2">
              <Accordion.Header>A plataforma cobra alguma taxa de administração?</Accordion.Header>
              <Accordion.Body>
                Não! A nossa plataforma não cobra uma taxa de administração. Ao invés disso, nós
                lucramos com a rentabilidade global dos investidores, isso significa que nos
                beneficiamos quando todos estão se beneficiando!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey="3">
              <Accordion.Header>Como posso obter suporte, caso necessário?</Accordion.Header>
              <Accordion.Body>
                O nosso bot está disponível 24/7 por meio da plataforma, entretanto, caso necessite
                de atendimento humano, é possível entrar em contato por email ou telefone, e um
                especialista entrará em contato o mais rápido possível.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>

        <Row className={`${styles.footer}`}>
          <Col>
            <img src={logo} />
            <div className="d-flex gap-4 mt-3 mb-3">
              <a href="https://instagram.com" target="_blank">
                <img src={instagram} />
              </a>
              <a href="https://youtube.com" target="_blank">
                <img src={youtube} />
              </a>
              <a href="https://facebook.com" target="_blank">
                <img src={facebook} />
              </a>
            </div>
            <p>ALM ChatBot © alguns direitos reservados.</p>
          </Col>

          <Col>
            <h3 className="mb-4">Contato</h3>

            <p>+55 61 99999-9999</p>
            <p>alm.contato@gmail.com</p>
            <p>St. Leste Projeção A - Gama Leste. 72444-240</p>
            <p>Brasília - DF</p>
          </Col>
          <Col>
            <h3 className="mb-4">Informações</h3>

            <p style={{ cursor: "pointer" }}>Termos e condições</p>
            <p style={{ cursor: "pointer" }}>Política de privacidade</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
