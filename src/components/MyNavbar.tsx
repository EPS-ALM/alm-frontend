import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./MyNavbar.module.css";

const MyNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="dark"
        variant="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          {/* Logo à esquerda */}
          <Navbar.Brand href="/">
            <img src="/src/assets/logo.png" style={{ height: "4rem" }} alt="Logo" />
          </Navbar.Brand>

          {/* Botão toggle para telas pequenas */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Menu colapsável */}
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Espaçamento flexível para posicionar o conteúdo */}
            <div className="d-flex w-100 justify-content-between align-items-center">
              {/* Links no centro */}
              <Nav className={`mx-auto`}>
                <Nav.Link className="me-5" href="/#">
                  Sobre Nós
                </Nav.Link>
                <Nav.Link href="/#duvidas">Dúvidas Frequentes</Nav.Link>
              </Nav>

              {/* Botão à direita */}
              <Button
                className={styles.mainButton}
                variant="primary"
                onClick={() => navigate("/simulacao")}
              >
                Simular agora
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;