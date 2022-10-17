import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component{
    render(){
        return (<nav className='navbar navbar-expand-lg fixed-top bg-light'>
            <div className='container-fluid'>
            <a className='navbar-brand' href='#'>QuickFood</a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon'></span></button>

            <div className='navbar-collapse collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav m-auto'>
                    <li className='nav-item active'>
                        <a className='nav-link' href='#' >Shop</a>
                    </li>
                    <li className='nav-item active'>
                        <a className='nav-link' href='#' >Location</a>
                    </li>
                    <li className='nav-item active'>
                        <a className='nav-link' href='#' >Add Restaurant</a>
                    </li>
                </ul>
                <button className='btn my-2 my-sm-0 m-1'>Log in</button>
                <button className='btn btn-outline-primary my-2 my-sm-0 m-1'>Sign Up</button>
            </div>
            </div>
        </nav>
        )
    }
}

export default Navbar