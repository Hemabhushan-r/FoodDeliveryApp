import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';
import BottomNavbar from './BottomNavBar';
let Restaurants=require('../Restaurants.json')

class Search extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH1={fontFamily:'Cookie',fontSize:'4em'}
        this.stylingH2={fontFamily:'Cookie',fontSize:'2.2em'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'400px',width:'100%'}
        this.state={restaurants:[],filteredres:[],searchtext:'',searchtextactual:''}
    }
    updateFilteredList=(action)=>{
        if(action==='top-rated'){
            const list=this.state.restaurants.filter((res)=>{
                    return parseFloat(res.Restaurant_Rating)> 4.4                
            })
            this.setState({filteredres:list})
        }
        else if(action==='biryani'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('biryani')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='sweets'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('sweets')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='snacks'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('snacks')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='fast-food'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('fast food')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='chinese'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('chinese')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='italian'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('italian')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='north-indian'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('north indian')                
        })
        this.setState({filteredres:list})
        }
        else if(action==='south-indian'){
            const list=this.state.restaurants.filter((res)=>{
                return res.Restaurant_Description.toLowerCase().includes('south indian')                
        })
        this.setState({filteredres:list})
        }
        
    }
    handleSearchChange=(e)=>{
        const list=this.state.restaurants.filter((res)=>{
            if(this.state.searchtext===''){
                return res
            }
            else{
                return res.Restaurant_Name.toLowerCase().includes(this.state.searchtext)
            }
        })
        this.setState({filteredres:list})
        this.setState({searchtext:e.target.value.toLowerCase()})
        this.setState({searchtextactual:e.target.value})
    }
    componentDidMount(){
        
        this.setState({restaurants:Restaurants})
        this.setState({filteredres:Restaurants})
        console.log(this.state.restaurants)
    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            <motion.div  initial={{y:-60}} whileInView={{y:0}} className='sticky-top mt-5 container pt-5 shadow-lg rounded-3 mb-2 pb-2' style={{backgroundColor:'#ffd149',top:'3em'}}>
                <motion.div initial={{y:-60}} whileInView={{y:0}} className='form-floating mb-3 mx-4 shadow-lg'>
                        <input onChange={this.handleSearchChange} name='search' type='text' className='form-control' id='floatingSearchBar' placeholder='Search Restaurants'/>
                        <label htmlFor='floatingSearchBar' className='fw-bold'>Search Restaurants</label>
                </motion.div>  
                <div className='row g-1'>
                    <div className='col fw-bold h3'>Filters:</div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('top-rated')}} className='btn btn-secondary shadow-lg'>Top Rated</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('biryani')}} className='btn btn-secondary shadow-lg'>Biryani</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('sweets')}} className='btn btn-secondary shadow-lg'>Sweets</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('snacks')}} className='btn btn-secondary shadow-lg'>Snacks</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('fast-food')}} className='btn btn-secondary shadow-lg'>Fast Food</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('chinese')}} className='btn btn-secondary shadow-lg'>Chinese</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('italian')}} className='btn btn-secondary shadow-lg'>Italian</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('north-indian')}} className='btn btn-secondary shadow-lg'>North Indian</button></div>
                    <div className='col'><button onClick={()=>{this.updateFilteredList('south-indian')}} className='btn btn-secondary shadow-lg'>South Indian</button></div>
                </div>
            </motion.div>
            <div className='container-fluid'>
            <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} className='d-flex px-4 mx-3' style={this.stylingH1}>{this.state.searchtextactual==''?'Search Restaurants Near you':'Showing Results for: '+this.state.searchtextactual}</motion.h2>
                <div className='row flex-row' >
                    {this.state.restaurants.length===0?[<RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>,
                    <RestaurantCardPlaceholder rating={'3.4'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={'200 FOR TWO'}/>]
                    :this.state.filteredres.map((restaurant)=>{
                        return(<RestaurantCard key={restaurant.index} restaurantURL={restaurant.Restaurant_URL} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    })}
                </div>
            </div>
            <BottomNavbar/>
        </div>)
    }
}
export default Search