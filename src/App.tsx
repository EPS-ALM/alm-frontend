import { Outlet } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";

const App = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};

export default App;
