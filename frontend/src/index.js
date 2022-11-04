import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './App';
import './components/CustomerSignUp';
import CustomerSignUp from './components/CustomerSignUp.js';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import DeliveryStatus from './components/DeliveryStatus';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}>
      <Route path='customerSignUp' element={<CustomerSignUp/>}/>
      <Route path='home' />
      <Route path='orderonline' />
      <Route path='deliveryStatus' element={<DeliveryStatus/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
