import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

class CustomerSignUp extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00',animation:'spin 10s ease infinite'}
        this.stylingH={fontFamily:'Cookie'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'200px',width:'100%'}
    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-2 w-100 px-0' style={this.styling}>
            <style>{`
            @keyframes spin {
                 0% { background-position:0% 50%; }
                 50% { background-position:100% 50%; }
                 100% { background-position:0% 50%; }
            }
        `}</style>
            <div className='mb-2 pb-2'>
                <h1 className='pt-5' style={this.stylingH}>Few Steps to avail your food at your doorstep</h1>
            </div>
            <div><img src='https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg' style={this.stylingImg} className='img-fluid'/></div>
            <h1 className='my-4' style={this.stylingH}>Share Some Info About You</h1>
            <div className='container px-0 shadow-lg rounded-4' >
                <form className='rounded-4 shadow-lg py-2' style={{backgroundColor:'#ffd149'}}>
                    <figcaption className='mx-2 my-2 px-2 py-2'><h2>Sign Up</h2></figcaption>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='name' className='form-control' id='floatingName' placeholder='name'/>
                        <label htmlFor='floatingName'>Full Name</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='email' className='form-control' id='floatingEmail' placeholder='name@example.com'/>
                        <label htmlFor='floatingEmail'>Email</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='password' className='form-control' id='floatingPassword' placeholder='Password'/>
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>
                    <div className='input-group mb-3 mx-auto px-4'>
                        <button className='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>+91</button>
                        <ul className='dropdown-menu'>
                            <li className='dropdown-item'>+60</li>
                            <li className='dropdown-item'>+63</li>
                            <li className='dropdown-item'>+94</li>
                        </ul>
                        <input type='number' className='form-control' placeholder='Phone No.' aria-label='Phone Number'/>
                    </div>
                    <div className='d-grid px-4'  >
                    <button type='submit' className='btn btn-secondary' >Create Account</button>
                    </div>
                    
                    <hr className='hr mx-4' />
                    
                    <div className='d-grid px-4'>
                    <button type='submit' className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>
                    </div>
                    <hr className='hr mx-4' />
                    <div className='mx-2 py-2'>
                        Click here if you already have an account to <Link>Sign in</Link>
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default CustomerSignUp;