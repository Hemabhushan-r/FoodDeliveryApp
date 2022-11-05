import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'
import axios from 'axios';

class BottomNavbar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<div className='container-fluid  mt-4 mb-2 py-4 shadow-lg'style={{backgroundColor:'#ef6c00'}}>
        <div className='container '>
        <div className='row'>
            <div className='col-lg-3 mb-3'>
                <h4>QuickFood</h4>
                <ul className='list-unstyled'>
                    <li className='mb-2'><i className='bi bi-c-circle'></i> 2022-2022</li>
                    <li className='mb-2'>Privacy terms</li>
                    <li className='mb-2'>Delivery Compliancy</li>
                </ul>
                
            </div>
            <div className='col-6 col-lg-2 mb-3'>
                <h6>Product</h6>
                <ul className='list-unstyled'>
                    <li className='mb-2'>Product1</li>
                    <li className='mb-2'>Product2</li>
                    <li className='mb-2'>Product3</li>
                </ul>
                
            </div>
            <div className='col-6 col-lg-2 mb-3'>
                <h6>Team</h6>
                <ul className='list-unstyled'>
                    <li className='mb-2'>Member 1</li>
                    <li className='mb-2'>Member 2</li>
                    <li className='mb-2'>Member 3</li>
                </ul>
                
            </div>
            <div className='col-6 col-lg-2 mb-3'>
                <h6>City</h6>
                <ul className='list-unstyled'>
                    <li className='mb-2'>City 1</li>
                    <li className='mb-2'>City 2</li>
                    <li className='mb-2'>City 3</li>
                </ul>
                
            </div>
            <div className='col-6 col-lg-2 mb-3'>
                <h6>Countries</h6>
                <ul className='list-unstyled'>
                    <li className='mb-2'>Country 1</li>
                    <li className='mb-2'>Country 2</li>
                    <li className='mb-2'>Country 3</li>
                </ul>
                
            </div>
            
        </div>
        </div>
    </div>)
    }
}
export default BottomNavbar;