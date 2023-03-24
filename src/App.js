// import logo from './logo.svg';
import { Button } from 'bootstrap';
import './App.css';
import Sidebar from './Common/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import Admin from "./admin";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    {/* <Sidebar/>  */}
   <Toaster position='top-right'/>
    <Admin/>

    </>
    // <div className="App">
      
    //  <Sidebar/> 
      
    // </div>
  );
}

export default App;
