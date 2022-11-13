import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'

class FoodCard extends React.Component{
    constructor(props){
        super(props)
        this.state={isFoodAdded:false}
    }
    handleFoodAdd=()=>{
        if(this.state.isFoodAdded===false){
            this.setState({isFoodAdded:true})
        }
        else{
            this.setState({isFoodAdded:false})
        }
        
    }
    render(){
        return(<motion.div id={this.props.Id} initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.005}} whileTap={{scale:0.995}} viewport={{once:true}} className='py-lg-2 mb-2'>
        <div className='card mx-lg-3 rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <div className='row'>
                <div className='col-9'>
                    <div className='card-body'>
                        <div className='card-title h4  d-flex'>{this.props.foodName}</div>
                        <div className='card-text d-flex'><i className='bi bi-currency-rupee'></i> 120</div>
                        <div className='d-flex'>{this.state.isFoodAdded?<button onClick={this.handleFoodAdd} className='btn btn-danger'>Remove  <i className='bi bi-cart-plus'></i></button>:<button onClick={this.handleFoodAdd} className='btn btn-success'>Add  <i className='bi bi-cart-plus'></i></button>}</div>
                    </div>
                </div>
                <div className='col-3 card-img-right'>
                    <img className='rounded-4 p-2' style={{height:'8em',width:'8em'}} src={this.props.imgSrc} alt={this.props.imgAlt}/>
                </div>
                
            </div>            
        </div>
    </motion.div>)
    }
}

export default FoodCard;