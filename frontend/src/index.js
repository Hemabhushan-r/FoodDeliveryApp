import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import $ from 'jquery';
import Popper from 'popper.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'bootstrap'
import './index.css';
import App from './App';
import CustomerSignUp from './components/CustomerSignUp';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import DeliveryStatus from './components/DeliveryStatus';
import Home from './components/Home';
import SignIn from './components/SignIn';
import OrderOnline from './components/OrderOnline';
import Restaurant from './components/Restaurant';
import Search from './components/Search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}>
      <Route path='customerSignUp' element={<CustomerSignUp/>}/>
      <Route path='signIn' element={<SignIn/>}/>
      <Route path='' element={<Home/>} />
      <Route path='/restaurants/:res' element={<Restaurant/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='orderOnline' element={<OrderOnline/>} />
      <Route path='deliveryStatus' element={<DeliveryStatus/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
