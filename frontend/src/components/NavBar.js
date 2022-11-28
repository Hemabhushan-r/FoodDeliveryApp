import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link,useLocation} from 'react-router-dom';
import {Avatar} from '@mui/material'
import {motion} from 'framer-motion';
import withRouter from './withRouter';
import decode from 'jwt-decode';
import {GoogleLogin,googleLogout} from '@react-oauth/google';

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state={user:JSON.parse(localStorage.getItem('profile')),cartItemsCount:0}
        this.styling={background:'linear-gradient(45deg,#ef6c00,#ef6c00)',backdropFilter:'blur(0.8)'}
        this.stylingNavbarBrand={fontFamily:'Cookie',fontSize:'2.2em'}

    }
    logout=()=>{
        localStorage.removeItem('profile')
        this.props.setisUserLoggedIn(false)
        this.setState({user:null})
    }
    componentDidMount(){
        //console.log(this.props.setisUserLoggedIn)
        const token=this.state.user?.token
        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp*1000< new Date().getTime()){
                this.logout()
            }
        }
        this.setState({user:JSON.parse(localStorage.getItem('profile')),cartItemsCount:this.props.cartItems.length})
    }
    componentDidUpdate(prevProps){
        if(this.props.location!=prevProps.location){
            const token=this.state.user?.token
        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp*1000< new Date().getTime()){
                this.logout()
            }
        }
        this.setState({user:JSON.parse(localStorage.getItem('profile'))})
        }
        if(this.props.cartItems!==prevProps.cartItems){
            this.setState({cartItemsCount:this.props.cartItems?.length})
        }
    }
    render(){
        return (<nav className='navbar navbar-expand-lg fixed-top bg-light shadow' style={this.styling}>
            <div className='container-fluid'>
            <Link className='navbar-brand' style={this.stylingNavbarBrand} to={'/'}>QuickFood</Link>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon'></span></button>

            <div className='navbar-collapse collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav m-auto fw-bolder'>
                    <li className='nav-item active mx-2'>
                        <Link className='nav-link' to={'/orderOnline'} ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-basket3' style={{fontSize:'1.5em'}}></i></motion.div>  Shop</Link>
                    </li>
                    <li className='nav-item active mx-2'>
                        <a className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-geo-alt' style={{fontSize:'1.5em'}}></i></motion.div>  Location</a>
                    </li>
                    <li className='nav-item active mx-2'>
                    <Link to={'/search'} className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-search' style={{fontSize:'1.5em'}}></i></motion.div>  Search Restaurants</Link>
                        {/* {this.state.user?.role=='customer'?<Link to={'/addRestaurant'} className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-shop' style={{fontSize:'1.5em'}}></i></motion.div>  Search Restaurants</Link>:<Link to={'/addRestaurant'} className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-shop' style={{fontSize:'1.5em'}}></i></motion.div>  Add Restaurant</Link>} */}
                    </li>
                </ul>
                {this.state.user?.result ?<div className='row'>      
                    <div className='col-1 d-inline-flex'><Avatar className='border border-3 shadow-lg border-warning' alt={this.state.user?.result.name} src={this.state.user?.result.picture}>{this.state.user?.result.name.charAt(0)}</Avatar></div>
                    <div className='col-3 fw-bold px-2 mx-4'>{this.state.user?.result.name}</div>      
                    <div className='col-1 position-relative px-2 mx-2'><button className='btn' type='button' data-bs-toggle='offcanvas' data-bs-target='#CartOffcanvas' aria-controls='offcanvasWithBothOptions'><i className='bi bi-cart' style={{fontSize:'1.5em'}}></i><span className='position-absolute top-0 start-100 translate-end badge rounded-pill bg-success'>{this.state.cartItemsCount}</span></button></div>
                    <button className='col-3 ms-4 btn btn-outline-dark my-2 my-sm-0' onClick={this.logout}>Log out</button>
                </div>:<div>
                <Link to={'/signIn'} className='btn my-2 my-sm-0 m-1'>Log in</Link>
                <Link to={'/customerSignUp'}><button className='btn btn-outline-dark my-2 my-sm-0 m-1'>Sign Up</button></Link>
                </div>
                }
            </div>
            </div>
        </nav>
        )
    }
}

export default withRouter(Navbar)