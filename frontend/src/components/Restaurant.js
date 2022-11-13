import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';
import BottomNavbar from './BottomNavBar';
import FoodCard from './FoodCard';
import FoodCardPlaceholder from './FoodCardPlaceHolder';


class Restaurant extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH1={fontFamily:'Cookie',fontSize:'4em'}
        this.stylingH2={fontFamily:'Cookie',fontSize:'2.2em'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'400px',width:'100%'}
        this.state={foodlist:[]}
    }

    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            <motion.div initial={{opacity:0.,x:-200}}  whileInView={{opacity:1,x:0}} viewport={{once:true}} className='container-fluid shadow-lg pt-5 pb-4' style={{backgroundColor:'#ffaf3f'}}>
                <div className='row'>
                    <div className='col-lg-3 my-3'><img className='shadow-lg rounded-4' style={{width:'18em',height:'18em'}} src={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} alt={this.props.imgAlt}/></div>
                    <div className='col-lg-6 my-3'>
                        <h1 style={this.stylingH1}>Burger King</h1>
                        <h4>Burgers, American</h4>
                        <h5>Location</h5>
                        <div className='row p-4'>
                            <div className='col-3'>
                            <i className='bi bi-star-fill' style={{color:this.props.rating>4?"green":"#ef6c00"}}></i> {this.props.rating} 
                            
                            </div>
                            <div className='col-1 d-flex'>
                            <div className='vr'></div>
                            </div>
                            
                            <div className='col-4'>
                                Best Seller
                            </div>
                            <div className='col-1 d-flex'>
                            <div className='vr'></div>
                            </div>
                            <div className='col-3'>
                            <span style={{fontSize:"0.8em"}}><i className='bi bi-currency-rupee'></i>{this.props.priceB}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3'>
                        <div className='container'>
                            <h1 style={this.stylingH1}>Offers</h1>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className='container-fluid shadow-lg rounded-2' style={{backgroundColor:'#ffaf4f'}}>
            <div className="row">
            <div style={{height:'35em',overflowY:'auto'}} className="col-4">
                <nav id="navbar-foodlist" className="h-100 flex-column align-items-stretch pe-4 border-end border-dark">
                <nav className="nav nav-pills flex-column">
                    <a className="nav-link"  style={{color:'black'}} href="#item-1">Item 1</a>
                    <nav className="nav nav-pills flex-column">
                    <a className="nav-link ms-3 my-1"  style={{color:'black'}} href="#item-1-1">Item 1-1</a>
                    <a className="nav-link ms-3 my-1" style={{color:'black'}} href="#item-1-2">Item 1-2</a>
                    </nav>
                    <a className="nav-link" style={{color:'black'}} href="#item-2">Item 2</a>
                    <a className="nav-link" style={{color:'black'}} href="#item-3">Item 3</a>
                    <nav className="nav nav-pills flex-column">
                    <a className="nav-link ms-3 my-1" style={{color:'black'}} href="#item-3-1">Item 3-1</a>
                    <a className="nav-link ms-3 my-1" style={{color:'black'}} href="#item-3-2">Item 3-2</a>
                    </nav>
                </nav>
                </nav>
            </div>

            <div className="col-8">
                <div style={{height:'35em',overflowY:'auto'}} data-bs-spy="scroll" data-bs-target="#navbar-foodlist" data-bs-smooth-scroll="true"  tabIndex="0">
                <FoodCard Id={'item-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCardPlaceholder foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-1-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-1-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                
                </div>
            </div>
            </div>
            </div>
            

            <BottomNavbar/>
        </div>)
    }
}

export default Restaurant;