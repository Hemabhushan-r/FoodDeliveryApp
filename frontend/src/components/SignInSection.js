import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import BottomNavbar from './BottomNavBar';
import {GoogleOAuthProvider,GoogleLogin,googleLogout,useGoogleLogin} from '@react-oauth/google';
import GoogleCustomButton from './GoogleCustomButton';
import axios from 'axios';
import withRouter from './withRouter';

class SignInSection extends React.Component{
    constructor(props){
        super(props)
        this.state={restaurants:[],formData:{email:'',password:'',role:'customer'},dropDown:'Sign In as'}
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        //console.log(this.state.formData)
        axios.post('http://localhost:5000/user/signin',{...this.state.formData}).then(response=>{
        localStorage.setItem('profile',JSON.stringify({...response.data}))
        this.props.navigate("/")
        }).catch((error)=>{
            this.props.handleError(error.response.data.message)
            console.log(error)
        })
        //console.log(this.state.formData)
    }
    handleChange=(event)=>{
        this.setState({formData:{...this.state.formData,[event.target.name]:event.target.value}})
    }
    handleRoleDropdown=(event)=>{
        this.setState({formData:{...this.state.formData,role:event.target.name},dropDown:event.target.value})
        //console.log(this.state)
    }
    render(){
        return(<motion.div initial={{scale:0.8}} whileInView={{scale:1}} viewport={{once:true}}  className='pt-3 col-12 col-lg-6'>
                        <form onSubmit={this.handleSubmit} className='rounded-4 shadow-lg py-2' style={{backgroundColor:'#ffd149'}}>
                    <figcaption className='mx-2 my-2 px-2 py-2'><h2>Sign In</h2></figcaption>                    
                    <div className='form-floating mb-3 mx-4'>
                        <input onChange={this.handleChange} name='email' type='email' className='form-control' id='floatingEmail' placeholder='name@example.com'/>
                        <label htmlFor='floatingEmail'>Email</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input onChange={this.handleChange} name='password' type='password' className='form-control' id='floatingPassword' placeholder='Password'/>
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>  
                    <div className='mb-3 d-block dropdown'>
                        <button className='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            {this.state.dropDown}
                        </button>
                        <ul className='dropdown-menu'>
                            <li><button onClick={this.handleRoleDropdown} name='customer' value='Customer' className='dropdown-item' type='button'>Customer</button></li>
                            <li><button onClick={this.handleRoleDropdown} name='delivery-personnel' value='Delivery Personnel' className='dropdown-item' type='button'>Delivery Personnel</button></li>
                            <li><button onClick={this.handleRoleDropdown} name='restaurant-admin' value='Restaurant Admin' className='dropdown-item' type='button'>Restaurant Admin</button></li>
                        </ul>
                    </div>
                    

                    <div className='d-grid px-4'  >
                    <button type='submit' className='btn btn-secondary' >Sign In</button>
                    </div>
                    <div className='pt-2 row'>
                        <div className='col-5'>
                        <hr className='hr mx-4' />
                        </div>
                        <div className='col-2'>
                        Or
                        </div>
                        <div className='col-5'>
                        <hr className='hr mx-4' />
                        </div>
                    </div>
                    
                    <div className='d-grid px-4'>
                    <GoogleCustomButton/>
                    </div>
                    {/* <div className='d-grid px-4'>
                    <button type='submit' onSubmit={this.onSignIn} className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>
                    </div> */}
                    <hr className='hr mx-4' />
                    <div className='mx-2 py-2'>
                        Click here to create an account <Link to={'/customerSignUp'}>Sign Up</Link>
                    </div>
                </form>
                        </motion.div>)
    }
}

export default withRouter(SignInSection);