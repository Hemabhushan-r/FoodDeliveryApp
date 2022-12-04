import logo from './logo.svg';
import './App.css';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/NavBar.js';
import Navbar from './components/NavBar.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router,Route,Link, Outlet, useLocation} from 'react-router-dom';
import Cart from './components/Cart';
import { useEffect,useState } from 'react';


function App() {
  
  const [isUserLoggedIn,setisUserLoggedIn]=useState(false)
  const [cartItems,setcartItems]=useState([])
  const location=useLocation()
  let items=[]
  useEffect(()=>{
    console.log(isUserLoggedIn)
    const user=JSON.parse(localStorage.getItem('profile'))
    if(!user){
      setisUserLoggedIn(false)
    }
    else{
      setisUserLoggedIn(true)
      items=user.cartItems
      setcartItems(items)
    }
  },[location])
  const updateCartItem=(action,item)=>{
    const user=JSON.parse(localStorage.getItem('profile'))
    if(user){
      if(action==='add'){
        items=user.cartItems
      items.push(item)
      localStorage.setItem('profile',JSON.stringify({...user,cartItems:items}))
      setcartItems(items)
      }
      else if(action==='updateQtyincrement'){
        items=user.cartItems.map((cartitem)=>{
          if(cartitem.count>=0){
          if(cartitem.foodName===item.foodName){
            cartitem.count+=1
          }
        }
          return cartitem
        })
        localStorage.setItem('profile',JSON.stringify({...user,cartItems:items}))
        setcartItems(items)
      }
      else if(action==='updateQtydecrement'){
        items=user.cartItems.map((cartitem)=>{
          if(cartitem.count==1){
            updateCartItem('remove',item)
          }
          else if(cartitem.count>0){
          if(cartitem.foodName===item.foodName){
            cartitem.count-=1
          }
        }
          return cartitem
        })
        localStorage.setItem('profile',JSON.stringify({...user,cartItems:items}))
        setcartItems(items)
      }
      else if(action==='remove'){
        items=user.cartItems.filter((cartitem)=>{
          return cartitem.foodName!==item.foodName
        })
        localStorage.setItem('profile',JSON.stringify({...user,cartItems:items}))
        setcartItems(items)
      }
    }
  }
  return (
    <GoogleOAuthProvider clientId='146665827801-tplvm4bfgnoi45bn2o3u9qs6pdkmmohq.apps.googleusercontent.com' >
      <div className="App">
      <Navbar cartItems={cartItems}  setcartItems={setcartItems} isUserLoggedIn={isUserLoggedIn} updateCartItem={updateCartItem} setisUserLoggedIn={setisUserLoggedIn} context={[cartItems,setcartItems,updateCartItem]}/>
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
      <Outlet context={[cartItems,setcartItems,updateCartItem]} />
      <Cart cartItems={cartItems}  setcartItems={setcartItems} isUserLoggedIn={isUserLoggedIn} updateCartItem={updateCartItem}/>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
