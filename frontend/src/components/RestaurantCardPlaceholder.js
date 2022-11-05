import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'

class RestaurantCardPlaceholder extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<motion.div initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.05}} whileTap={{scale:0.95}} viewport={{once:true}} className='col-6 col-lg-3  p-lg-2 px-lg-1 mb-3' style={{display:"inline",float:"none"}}>
        <div className='card mx-lg-3 rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <img className='rounded-4 placeholder-wave' src={this.props.imgSrc} alt={this.props.imgAlt}/>
            <div className='card-body placeholder-glow'>
                <h5 className='card-title w-100 overflow-hidden placeholder'>{this.props.restaurantName}</h5>
                <h6 className='card-subtitle d-block w-100 text-muted mb-2 overflow-hidden placeholder'>{this.props.restaurantDesc}</h6>
                <div className='card-text d-flex'><div className='ms-2 me-auto placeholder'><i className='bi bi-star-fill' style={{color:this.props.rating>4?"green":"#ef6c00"}}></i> {this.props.rating}</div>   <span className='placeholder'><i className='bi bi-currency-rupee'></i>{this.props.priceB}</span></div>
            </div>
        </div>
    </motion.div>)
    }
}

export default RestaurantCardPlaceholder;