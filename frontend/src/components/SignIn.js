import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import BottomNavbar from './BottomNavBar';
import {GoogleOAuthProvider,GoogleLogin,googleLogout,useGoogleLogin} from '@react-oauth/google';
import GoogleCustomButton from './GoogleCustomButton';
import axios from 'axios';
import SignInSection from './SignInSection';

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.errorText='Default Error'
        this.stylingH1={fontFamily:'Cookie',fontSize:'4em'}
        this.stylingH2={fontFamily:'Cookie',fontSize:'2.2em'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'400px',width:'100%'}
        this.state={restaurants:[]}
    }
    handleError=(errorText)=>{
        this.errorModalText.innerHTML=errorText
        this.errorModalBtn.click()
    }
    retrieveRestaurants=(baseAPIURL)=>{
        axios.get(baseAPIURL).then(response=>{
            this.setState({restaurants:response.data})
            //console.log(response.data)
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
                        
                        <div className='col-12 col-lg-6'>
                            <img className='shadow-lg rounded-3 pt-2' style={this.stylingImg} src='https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg' alt='food-img'></img>
                        </div>
                        <SignInSection handleError={this.handleError}/>
                    </div>                    
                </motion.div>
            </div>
            
            <div className='container-fluid'>
                <h2 style={this.stylingH1}>Restaurants Near Me</h2>
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
            <button ref={input=>this.errorModalBtn=input} type='button' className='d-none btn btn-primary' data-bs-toggle='modal' data-bs-target='#errorModal'>
                    Launch Error Modal
            </button> 
            <div className='modal fade' id='errorModal' tabIndex='-1' aria-labelledby='errorModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='errorModalLabel'>Oops!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body' ref={input=>this.errorModalText=input}>
                            {this.errorText}
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar/>
        </div>)
    }
}

export default SignIn;