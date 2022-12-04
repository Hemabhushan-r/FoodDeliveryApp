import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import BottomNavbar from './BottomNavBar';
import withRouter from './withRouter';
import {GoogleOAuthProvider,GoogleLogin,googleLogout,useGoogleLogin} from '@react-oauth/google';
import GoogleCustomButton from './GoogleCustomButton';
import axios from 'axios'
import CartFoodCard from './CartFoodCard'

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state={cart:this.props.cartItems,cartSum:this.props.cartItems?.reduce((accumulator,item)=>{
            return accumulator+parseInt(item.count)*parseInt(item.price)
        },0),cartDC:25,cartTax:0,cartTotal:0}
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH={fontFamily:'Cookie'}
    }
    retrieveCartItems=()=>{
        
    }
    paymentHandler = async (e) => {
        const API_URL = 'https://fooddeliveryappbackend.onrender.com/api/'
        e.preventDefault();
        const orderUrl = `${API_URL}order`+'/'+this.state.cartTotal;
        const response = await axios.get(orderUrl);
        const { data } = response;
        const options = {
          key:'rzp_live_1MykQeYgLLtfoG' ,//process.env.RAZOR_PAY_KEY_ID
          name: "Quick Food",
          description: "Food at your doorsteps",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await axios.post(url, {amount:this.state.cartTotal})
             console.log(captureResponse.data);
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };


    componentDidMount(){
        //console.log(this.state.cart)
        const cartSum=this.props.cartItems?.reduce((accumulator,item)=>{
            return accumulator+parseInt(item.count)*parseInt(item.price)
        },0)
        const cartTax=cartSum*0.18
        const cartTotal=cartSum+cartTax+this.state.cartDC
        this.setState({cart:this.props.cartItems,cartSum:cartSum,cartTax:cartTax,cartTotal:cartTotal})
    }
    componentDidUpdate(prevProps){
        const cartSum=this.props.cartItems?.reduce((accumulator,item)=>{
            return accumulator+parseInt(item.count)*parseInt(item.price)
        },0)
        const cartTax=cartSum*0.18
        const cartTotal=cartSum+cartTax+this.state.cartDC
        if(this.props.isUserLoggedIn!=prevProps.isUserLoggedIn){
            this.setState({cart:this.props.cartItems,cartSum:cartSum,cartTax:cartTax,cartTotal:cartTotal})
        }
        if(this.props.cartItems!=prevProps.cartItems){
            this.setState({cart:this.props.cartItems,cartSum:cartSum,cartTax:cartTax,cartTotal:cartTotal})
        }
    }
    render(){
        return(<motion.div style={this.styling} className='offcanvas offcanvas-end' data-bs-scroll='true' tabIndex='-1' id='CartOffcanvas' aria-labelledby='offcanvasWithBothOptionsLabel'>
            <div className='offcanvas-header rounded-4 shadow-lg'>
                <h1 style={this.stylingH} className='offcanvas-title' id='offcanvasWithBothOptionsLabel' ><i className='bi bi-cart' style={{fontSize:'1.2em'}}></i>Cart</h1>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
            </div>
            <div className='offcanvas-body'>
                {this.state.cart?.length==0?<div className='h2'>Cart is Empty</div>:
                this.state.cart?.map((cartItem)=>{
                    return <CartFoodCard price={cartItem.price} updateCartItem={this.props.updateCartItem} count={cartItem.count} foodName={cartItem.foodName} imgSrc={cartItem.imgSrc} imgAlt={'food-thumbnail'}/>
                })}                
                <div className='rounded-4 fw-bold fs-5 shadow-lg' style={{backgroundColor:'#ffaf3f'}}>
                    <div className='d-flex justify-content-between px-3 py-1'><div>Sum:</div><i className='bi bi-currency-rupee'>{this.state.cartSum}</i></div>
                    <div className='d-flex justify-content-between px-3 py-1'><div>Delivery Charges:</div><i className='bi bi-currency-rupee'>{this.state.cartDC}</i></div>
                    <div className='d-flex justify-content-between px-3 py-1'><div>Tax:</div><i className='bi bi-currency-rupee'>{this.state.cartTax}</i></div>
                    <hr className='px-2 mx-3'/>
                    <div className='d-flex justify-content-between px-3 py-1'><div>Total:</div><i className='bi bi-currency-rupee'>{this.state.cartTotal}</i></div>
                    
                </div>
                <div className='row'>
                    <div className='col my-2 py-2 '><button onClick={this.paymentHandler} className='btn btn-success'>Pay Now</button></div>
                    <div className='col my-2 py-2 '><Link to={'/deliveryStatus'}><button  className='btn btn-success'>Pay through Cash on Delivery</button></Link></div>
                </div>
            </div>
        </motion.div>)
    }
}

export default Cart