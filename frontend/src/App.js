import logo from './logo.svg';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/NavBar.js';
import Navbar from './components/NavBar.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router,Route,Link, Outlet} from 'react-router-dom';

function App() {
  return (
    <GoogleOAuthProvider clientId='146665827801-tplvm4bfgnoi45bn2o3u9qs6pdkmmohq.apps.googleusercontent.com' >
      <div className="App">
      <Navbar/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Hello There</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Outlet/>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
