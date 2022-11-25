import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';

class RestaurantCard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<motion.div initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.05}} whileTap={{scale:0.95}} viewport={{once:true}} className='col-6 col-lg-3  p-lg-2 px-lg-1 mb-3' style={{display:"inline",float:"none"}}>
        <Link className='col-6 col-lg-3  p-lg-2 px-lg-1 mb-3' style={{color:'inherit',textDecoration:'none'}} to={this.props.restaurantURL}>
        <div className='card mx-lg-3 rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <img className='rounded-4' src={this.props.imgSrc} alt={this.props.imgAlt}/>
            <div className='card-body'>
                <div className='card-title fw-bold overflow-hidden'>{this.props.restaurantName}</div>
                <div className='card-subtitle text-muted mb-2 overflow-hidden'>{this.props.restaurantDesc}</div>
                <div className='card-text d-flex'><div className='me-auto'><i className='bi bi-star-fill' style={{color:this.props.rating>4?"green":"#ef6c00"}}></i> {this.props.rating}</div>   <span style={{fontSize:"0.8em"}}><i className='bi bi-currency-rupee'></i>{this.props.priceB}</span></div>
            </div>
        </div>
        </Link>
    </motion.div>)
    }
}

export default RestaurantCard;