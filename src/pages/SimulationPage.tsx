import { Container } from "react-bootstrap";
import MyChatBot from "../components/ChatBot/MyChatBot";

const SimulationPage = () => {
  return (
    <>
      <Container
        style={{
          paddingTop: "10rem",
          height: "100vh",
          backgroundColor: "#2d3a3a",
        }}
        className="w-100 d-flex justify-content-center"
        fluid
      >
        <MyChatBot />
      </Container>
    </>
  );
};

export default SimulationPage;
