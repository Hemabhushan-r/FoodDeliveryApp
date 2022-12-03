import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';
import BottomNavbar from './BottomNavBar';

class Home extends React.Component{
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
            <div className='px-3 mx-4 mb-2 pb-2'>                
                <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='vstack gap-2'>
                    <div className='row'>
                        <motion.div initial={{x:-300}} whileInView={{x:0}} viewport={{once:true}} className='col-12 col-lg-6'>
                            <h1 className='d-flex pt-5' style={this.stylingH1}><span >Check out awesome food</span></h1>
                            <h2 className='d-flex' style={this.stylingH2}><span >Amazing food at your doorstep</span></h2>
                            <ul className='list-unstyled mx-2'>
                                <li className='d-flex align-items-start'><i className='bi bi-caret-right-fill' style={{fontSize:'1.4em'}}> Explore restaurants around you</i></li>
                                <li className='d-flex align-items-start'><i className='bi bi-caret-right-fill' style={{fontSize:'1.4em'}}> Track your delivery after every order</i></li>
                                <li className='d-flex align-items-start'><i className='bi bi-caret-right-fill' style={{fontSize:'1.4em'}}> Your top-notch favourites right at your fingertips</i></li>                                
                                <li className='p-4 align-items-start'><Link to={'/orderOnline'}><button className='btn btn-dark' >Order Now</button></Link></li>
                            </ul>
                        </motion.div>
                        <motion.div initial={{y:-400}} whileInView={{y:0}} viewport={{once:true}}  className='col-12 col-lg-6'>
                            <img className='shadow-lg rounded-3 pt-2' style={this.stylingImg} src='https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg' alt='food-img'></img>
                        </motion.div>
                    </div>                    
                </motion.div>
            </div>
            <div className='container-fluid'>
                <h2 className='d-flex px-4 mx-3' style={this.stylingH1}>Trending Food</h2>
                <div className='row flex-row flex-nowrap customHScrollDisable' style={{overflowX:"auto",whiteSpace:"nowrap",scrollBehavior:"smooth",scrollbarWidth:"none"}}>
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.restaurants.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantURL={restaurant.Restaurant_URL} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={restaurant.Restaurant_ImgURL} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    }).slice(0,511)}
                </div>
                
            </div>
            <div className='container-fluid'>
                <h2 className='d-flex px-4 mx-3' style={this.stylingH1}>Discover New Food</h2>
                <div className='row flex-row flex-nowrap customHScrollDisable' style={{overflowX:"auto",whiteSpace:"nowrap",scrollBehavior:"smooth",scrollbarWidth:"none"}}>
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.restaurants.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantURL={restaurant.Restaurant_URL} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={restaurant.Restaurant_ImgURL} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    }).slice(0,511)}
                </div>
                
            </div>
            <BottomNavbar/>
        </div>)
    }
}

export default Home;