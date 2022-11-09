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

class SignIn extends React.Component{
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
                        
                        <div className='col-12 col-lg-6'>
                            <img className='shadow-lg rounded-3 pt-2' style={this.stylingImg} src='https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg' alt='food-img'></img>
                        </div>
                        <motion.div initial={{scale:0.8}} whileInView={{scale:1}} viewport={{once:true}}  className='pt-3 col-12 col-lg-6'>
                        <form className='rounded-4 shadow-lg py-2' style={{backgroundColor:'#ffd149'}}>
                    <figcaption className='mx-2 my-2 px-2 py-2'><h2>Sign In</h2></figcaption>                    
                    <div className='form-floating mb-3 mx-4'>
                        <input type='email' className='form-control' id='floatingEmail' placeholder='name@example.com'/>
                        <label htmlFor='floatingEmail'>Email</label>
                    </div>
                    <div className='form-floating mb-3 mx-4'>
                        <input type='password' className='form-control' id='floatingPassword' placeholder='Password'/>
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>        
                    <div className='d-grid px-4'  >
                    <button type='submit' className='btn btn-secondary' >Sign In</button>
                    </div>
                    <div className='pt-2 row'>
                        <div className='col-5'>
                        <hr className='hr mx-4' />
                        </div>
                        <div className='col-2'>
                        Or
                        </div>
                        <div className='col-5'>
                        <hr className='hr mx-4' />
                        </div>
                    </div>
                    
                    <div className='d-grid px-4'>
                    <GoogleCustomButton/>
                    </div>
                    {/* <div className='d-grid px-4'>
                    <button type='submit' onSubmit={this.onSignIn} className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>
                    </div> */}
                    <hr className='hr mx-4' />
                    <div className='mx-2 py-2'>
                        Click here to create an account <Link to={'/customerSignUp'}>Sign Up</Link>
                    </div>
                </form>
                        </motion.div>
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
            <BottomNavbar/>
        </div>)
    }
}

export default SignIn;