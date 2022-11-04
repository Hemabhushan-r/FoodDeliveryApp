import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.styling={background:'linear-gradient(45deg,#ef6c00,#ef6c00)',backdropFilter:'blur(0.8)'}
    }
    render(){
        return (<nav className='navbar navbar-expand-lg fixed-top bg-light shadow' style={this.styling}>
            <div className='container-fluid'>
            <a className='navbar-brand' href='#'>QuickFood</a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon'></span></button>

            <div className='navbar-collapse collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav m-auto'>
                    <li className='nav-item active mx-2'>
                        <a className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-basket3' style={{fontSize:'1.5em'}}></i></motion.div>  Shop</a>
                    </li>
                    <li className='nav-item active mx-2'>
                        <a className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-geo-alt' style={{fontSize:'1.5em'}}></i></motion.div>  Location</a>
                    </li>
                    <li className='nav-item active mx-2'>
                        <Link to={'/addRestaurant'} className='nav-link' href='#' ><motion.div style={{display:"inline-block"}} whileHover={{scale:1.2}} whileTap={{scale:0.95}}><i className='bi bi-shop' style={{fontSize:'1.5em'}}></i></motion.div>  Add Restaurant</Link>
                    </li>
                </ul>
                <button className='btn my-2 my-sm-0 m-1'>Log in</button>
                <Link to={'/customerSignUp'}><button className='btn btn-outline-primary my-2 my-sm-0 m-1'>Sign Up</button></Link>
            </div>
            </div>
        </nav>
        )
    }
}

export default Navbar