import { Container } from "react-bootstrap";
import MyChatBot from "../components/ChatBot/MyChatBot";

const SimulationPage = () => {
  return (
    <>
      <Container style={{ marginTop: "7rem" }} className='w-100 d-flex justify-content-center' fluid>
        <MyChatBot />
      </Container>
    </>
  );
};

export default SimulationPage;
