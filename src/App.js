import "./App.css";
import Admin from "./admin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Admin />
    </>
  );
}

export default App;
