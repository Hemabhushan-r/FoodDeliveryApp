import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import BottomNavbar from './BottomNavBar';
import withRouter from './withRouter';
import {GoogleOAuthProvider,GoogleLogin,googleLogout,useGoogleLogin} from '@react-oauth/google';
import GoogleCustomButton from './GoogleCustomButton';
import axios from 'axios'

class CustomerSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={formData:{name:'',email:'',password:'',number:'',confirmpassword:'',role:'customer'},dropDown:'Sign Up as'}
        this.errorText='Default Error'
        this.styling={backgroundColor:'#fb8c00',animation:'spin 10s ease infinite'}
        this.stylingH={fontFamily:'Cookie'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'200px',width:'100%'}
        this.googleSignUp=React.createRef()
    }
    handleRoleDropdown=(event)=>{
        this.setState({formData:{...this.state.formData,role:event.target.name},dropDown:event.target.value})
        //console.log(this.state)
    }
    handleError=(errorText)=>{
        this.errorModalText.innerHTML=errorText
        this.errorModalBtn.click()
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        axios.post('https://fooddeliveryappbackend.onrender.com/user/signup',{...this.state.formData}).then(response=>{
        localStorage.setItem('profile',JSON.stringify({...response.data}))        
        this.props.navigate("/")
        }).catch((error)=>{
            this.handleError(error.response.data.message)
            console.log(error)
        })
        console.log(this.state.formData)
    }
    handleChange=(event)=>{
        this.setState({formData:{
            ...this.state.formData,[event.target.name]:event.target.value
        }})
    }
    componentDidMount(){
        // let widthbtn=this.googleSignUp.current.offsetWidth;
        // function handleCredentialResponse(response) {
        //     console.log("Encoded JWT ID token: " + response.credential);
        //     console.log(response);
        //   }
        //   function handleUserDataResponse(Credential) {
        //     console.log(Credential);
        
        //   }
        //   function onComponentLoad() {
        //     google.accounts.id.initialize({
        //       client_id: "146665827801-tplvm4bfgnoi45bn2o3u9qs6pdkmmohq.apps.googleusercontent.com",
        //       callback: handleCredentialResponse,
        //       native_callback:handleUserDataResponse
        //     });
        //     google.accounts.id.renderButton(
        //       document.getElementById("buttonDiv"),
        //       { theme: "outline", size: "large",text:"signup_with",shape:"pill",width:widthbtn}  // customization attributes
        //     );
        //     google.accounts.id.prompt(); // also display the One Tap dialog
        //   }
        //   onComponentLoad();
    }
    onSignIn=()=>{
            // let cred={id:'..',password:'..'};
            // google.accounts.id.storeCredential(cred);
            // console.log(cred);
    }
    
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            
            <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='mb-2 pb-2'>
                <h1 className='pt-5' style={this.stylingH}>Few Steps to avail your food at your doorstep</h1>
            </motion.div>
            <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}}><img src='https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg' style={this.stylingImg} className='img-fluid shadow-lg'/></motion.div>
            <motion.h1 initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='my-4' style={this.stylingH}>Share Some Info About You</motion.h1>
            <motion.div initial={{opacity:0.2,scale:0.8}}  whileInView={{opacity:1,scale:1}} viewport={{once:true}} className='container px-0 shadow-lg rounded-4'  >
                
                <form className='rounded-4 shadow-lg py-2' onSubmit={this.handleSubmit} style={{backgroundColor:'#ffd149'}}>
                    <figcaption className='mx-2 my-2 px-2 py-2'><h2>Sign Up</h2></figcaption>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='name' name='name' onChange={this.handleChange} className='form-control' id='floatingName' placeholder='name'/>
                        <label htmlFor='floatingName'>Full Name</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='email' name='email' onChange={this.handleChange} className='form-control' id='floatingEmail' placeholder='name@example.com'/>
                        <label htmlFor='floatingEmail'>Email</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='password' name='password' onChange={this.handleChange} className='form-control' id='floatingPassword' placeholder='Password'/>
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='password' name='confirmpassword' onChange={this.handleChange} className='form-control' id='floatingconfirmPassword' placeholder='Confirm Password'/>
                        <label htmlFor='floatingconfirmPassword'>Confirm Password</label>
                    </div>
                    <div className='input-group mb-3 mx-auto px-4'>
                        <button className='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>+91</button>
                        <ul className='dropdown-menu'>
                            <li className='dropdown-item'>+60</li>
                            <li className='dropdown-item'>+63</li>
                            <li className='dropdown-item'>+94</li>
                        </ul>
                        <input type='number' name='number' onChange={this.handleChange} className='form-control' placeholder='Phone No.' aria-label='Phone Number'/>
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
                    <button type='submit'  className='btn btn-secondary' >Create Account</button>
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
                    <div className='mx-5 mb-3 d-grid' ref={this.googleSignUp}>
                    <div id="" className='m-auto'></div>
                    </div>
                    {/* <div className='mx-5 mb-3 d-grid'>
                    <GoogleLogin render={(renderProps)=>(<button type='submit' onClick={renderProps.onClick} className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>)} onSuccess={(response)=>{console.log(response)}}/>
                    </div> */}
                    
                    
                    <div className='d-grid px-4'>
                    <GoogleCustomButton/>
                    </div>
                    {/* <div className='d-grid px-4'>
                    <button type='submit' onSubmit={this.onSignIn} className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>
                    </div> */}
                    <hr className='hr mx-4' />
                    <div className='mx-2 py-2'>
                        Click here if you already have an account to <Link to={'/signIn'}>Sign in</Link>
                    </div>
                </form>
            </motion.div>
            <button ref={input=>this.errorModalBtn=input} type='button' className='d-none btn btn-primary' data-bs-toggle='modal' data-bs-target='#errorModal'>
                    Launch Error Modal
            </button> 
            <div  className='modal fade' id='errorModal' tabIndex='-1' aria-labelledby='errorModalLabel' aria-hidden='true'>
                <div  className='modal-dialog'>
                    <div style={{backgroundColor:'#ffaf3f'}} className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='errorModalLabel'>Oops!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body' ref={input=>this.errorModalText=input}>
                            {this.errorText}
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar/>
        </div>)
    }
}

export default withRouter(CustomerSignUp);