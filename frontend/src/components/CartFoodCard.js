import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'

class CartFoodCard extends React.Component{
    constructor(props){
        super(props)
        this.state={isFoodAdded:true}
    }
    handleFoodRemove=()=>{
        const item={foodName:this.props.foodName,imgSrc:this.props.imgSrc,count:1,price:parseInt(this.props.price)}
        if(this.state.isFoodAdded===true){
            this.props.updateCartItem('remove',item)
            this.setState({isFoodAdded:false})
        }
        
    }
    render(){
        return(<motion.div id={this.props.Id} initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.005}} whileTap={{scale:0.995}} viewport={{once:true}} className='mb-2'>
        <div className='card rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <div className='row'>
            <div className='col-3 card-img-left'>
                    <img className='rounded-4 p-2' style={{height:'8em',width:'8em'}} src={this.props.imgSrc} alt={this.props.imgAlt}/>
                </div>
                <div className='col-9'>
                    <div className='card-body'>
                        <div className='card-title h4 d-flex justify-content-between align-items-end'><div className='ms-2 me-auto'></div>{this.props.foodName}</div>
                        <div className='card-text d-flex justify-content-between align-items-end'><div className='ms-2 me-auto'></div><span className='badge bg-secondary rounded-pill'>x{this.props.count}</span><i className='bi bi-currency-rupee'></i>{this.props.price}</div>
                        <div className='pt-1 d-flex justify-content-between align-items-end'><div className='ms-2 me-auto'></div><button onClick={this.handleFoodRemove} className='btn btn-danger'>Remove  <i className='bi bi-cart-plus'></i></button></div>
                    </div>
                </div>
            </div>            
        </div>
    </motion.div>)
    }
}

export default CartFoodCard;