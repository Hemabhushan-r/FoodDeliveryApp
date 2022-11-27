import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion'
import axios from 'axios';
import { createClient } from 'pexels';

class FoodCard extends React.Component{
    constructor(props){
        super(props)
        this.state={isFoodAdded:false,foodURL:'https://img.icons8.com/color/480/vegetarian-food-symbol.png'}
    }
    handleFoodAdd=()=>{
        const item={foodName:this.props.foodName,imgSrc:this.props.imgSrc,count:1,price:parseInt(this.props.price)}
        if(this.state.isFoodAdded===false){
            this.props.updateCartItem('add',item)
            this.setState({isFoodAdded:true})
        }
        else{
            this.props.updateCartItem('remove',item)
            this.setState({isFoodAdded:false})
        }
        
    }
    componentDidUpdate(prevProps){
        const item={foodName:this.props.foodName,imgSrc:this.props.imgSrc,count:1,price:parseInt(this.props.price)}
        if(this.props.cartItems!=prevProps.cartItems){
            console.log(this.props.cartItems)
            const isFoodInCart=this.props.cartItems?.filter((cartitem)=>{
                return cartitem.foodName===item.foodName
            })
            console.log(isFoodInCart)
            if(isFoodInCart?.length!=undefined){
                if(isFoodInCart?.length!==0){
                    if(isFoodInCart[0].foodName===item.foodName){
                        this.setState({isFoodAdded:true})
                    }
                    
                }
                else {
                    this.setState({isFoodAdded:false})
                }
            }
            
        }
    }
    componentDidMount(){
        // const options = {
        //     method: 'GET',
        //     url: 'https://bing-image-search1.p.rapidapi.com/images/search',
        //     params: {q: this.props.foodName},
        //     headers: {
        //       'X-RapidAPI-Key': 'eaf0ad467amshba2df5bec093c4ep1ccc32jsn91944bf02ae6',
        //       'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        //     }
        //   };
          
        //   axios.request(options).then(function (response) {
        //       console.log(response.data);
        //   }).catch(function (error) {
        //       console.error(error);
        //   });
        // const client = createClient('563492ad6f91700001000001b1cb8050f4f54b6aaf13e9e51f2323a1');
        // const query = this.props.foodName;

        // client.photos.search({ query, per_page: 1 }).then(photos => {
        //     console.log(photos)
        // });

    }
    render(){
        return(<motion.div id={this.props.Id} initial={{opacity:0.5}} whileInView={{opacity:1}} whileHover={{scale:1.005}} whileTap={{scale:0.995}} viewport={{once:true}} className='py-lg-2 mb-2'>
        <div className='card mx-lg-3 rounded-4 shadow' style={{backgroundColor:'#ffaf3f'}}>
            <div className='row'>
                <div className='col-9'>
                    <div className='card-body'>
                        <div className='card-title h4  d-flex'>{this.props.foodName}</div>
                        <div className='card-text d-flex'><i className='bi bi-currency-rupee'></i>{this.props.price}</div>
                        <div className='card-text d-flex'>{this.props.description}</div>
                        {this.props.veg_nonveg.toLowerCase().includes('non-veg item')?<div className='img-fluid d-flex'><img style={{width:'1.5em',height:'1.5em'}} src='https://img.icons8.com/color/480/non-vegetarian-food-symbol.png'/></div>:
                        <div className='img-fluid d-flex'><img style={{width:'1.5em',height:'1.5em'}} src={this.state.foodURL}/></div>}
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