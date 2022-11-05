import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'

class RestaurantCard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<motion.div initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.05}} whileTap={{scale:0.95}} viewport={{once:true}} className='col-6 col-lg-3  p-lg-2 px-lg-1 mb-3' style={{display:"inline",float:"none"}}>
        <div className='card mx-lg-3 rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <img className='rounded-4' src={this.props.imgSrc} alt={this.props.imgAlt}/>
            <div className='card-body'>
                <div className='card-title'>{this.props.foodName}</div>
                <p className='card-text'><i className='bi bi-currency-rupee'></i> 120</p>
            </div>
        </div>
    </motion.div>)
    }
}

export default RestaurantCard;