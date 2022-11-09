import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';
import BottomNavbar from './BottomNavBar';

class OrderOnline extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH1={fontFamily:'Cookie',fontSize:'4em'}
        this.stylingH2={fontFamily:'Cookie',fontSize:'2.2em'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'400px',width:'100%'}
        this.state={restaurants:[]}
    }
    retrieveRestaurants=(baseAPIURL)=>{
        axios.get(baseAPIURL).then(response=>{
            this.setState({restaurants:response.data})
            console.log(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        const baseAPIURL='http://localhost:5000/api/restaurant_list'
        this.retrieveRestaurants(baseAPIURL)
    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
                <div className='container-fluid pt-4'>
                <h2 className='d-flex px-4 mx-3' style={this.stylingH1}>Discover New Food</h2>
                <div className='row flex-row flex-nowrap customHScrollDisable' style={{overflowX:"auto",whiteSpace:"nowrap",scrollBehavior:"smooth",scrollbarWidth:"none"}}>
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.restaurants.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    })}
                </div>
                </div>
                <div className='container-fluid'>
                <h2 className='d-flex px-4 mx-3' style={this.stylingH1}>Your favourites</h2>
                <div className='row flex-row flex-nowrap customHScrollDisable' style={{overflowX:"auto",whiteSpace:"nowrap",scrollBehavior:"smooth",scrollbarWidth:"none"}}>
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.restaurants.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    })}
                </div>
                </div>
                <div className='container-fluid'>
                <h2 className='d-flex px-4 mx-3' style={this.stylingH1}>Restaurants Near Me</h2>
                <div className='row flex-row flex-nowrap customHScrollDisable' style={{overflowX:"auto",whiteSpace:"nowrap",scrollBehavior:"smooth",scrollbarWidth:"none"}}>
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.restaurants.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    })}
                </div>
                
            </div>             
            <BottomNavbar/>
                </div>)
    }
}

export default OrderOnline;