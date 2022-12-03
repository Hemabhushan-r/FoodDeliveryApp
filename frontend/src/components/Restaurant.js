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
import withRouter from './withRouter';
import withContext from './withContext';
let Rest_FoodList=require('../rest_foodlist.json');

class Restaurant extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#ffaf3f'}
        this.stylingH1={fontFamily:'Cookie',fontSize:'4em'}
        this.stylingH2={fontFamily:'Cookie',fontSize:'2.2em'}
        this.stylingImg={objectFit:'none',objectPosition:'center',maxHeight:'400px',width:'100%'}
        this.state={foodlist:[],filteredfoodlist:[],searchtext:'',isvegon:false,mounted:0,Restaurant_Name:'PlaceHolder Restaurant',Restaurant_Description:'Restaurant Description Placeholder'
        ,Restaurant_Rating:'Rating Placeholder',Price_B:'Price B Placeholder',Restaurant_Loc:'Location Placeholder',Offer:'Offer Placeholder'}
    }
     handlevegchange=(e)=>
     {
          this.setState({isvegon:e.target.checked})
     }


    offlineretriveFoodItems=(Restaurant_URL)=>{
        const rest_off_foodlist=Rest_FoodList.filter((res)=>{
            if(res.Restaurant_URL===Restaurant_URL){
                return res
            }
            else{
                return false
            }
        })
        const Rest_foodlist=rest_off_foodlist[0]
        const foodlist_desc=Rest_foodlist.Food_Description.slice(1,Rest_foodlist.Food_Description.length-1).split(",")
        const foodlist_new=Rest_foodlist.Food_Name.slice(1,Rest_foodlist.Food_Name.length-1).split(",")
        const foodlist_price=Rest_foodlist.Food_Price.slice(1,Rest_foodlist.Food_Price.length-1).split(",")
        const foodlist_cat=Rest_foodlist.Food_Cat.slice(1,Rest_foodlist.Food_Cat.length-1).split(",")
        const foodlist_cat_cnt=Rest_foodlist.Food_Cat_Count.slice(1,Rest_foodlist.Food_Cat_Count.length-1).split(",")
        const foodlist_subcat=Rest_foodlist.Food_Subcat.slice(1,Rest_foodlist.Food_Subcat.length-1).split(",")
        const foodlist_subcat_cnt=Rest_foodlist.Food_Subcat_Count.slice(1,Rest_foodlist.Food_Subcat_Count.length-1).split(",")
        const foodlist_veg_nonveg=Rest_foodlist.Food_Veg_Nveg.slice(1,Rest_foodlist.Food_Veg_Nveg.length-1).split(",")
        const foodObj=[]
        for(let i=0;i<foodlist_new.length;i++){
            foodObj.push({Food_Name:foodlist_new[i],Food_Description:foodlist_desc[i],Food_Price:foodlist_price[i],
                Food_Veg_Nveg:foodlist_veg_nonveg[i]
            })
        }
        console.log(foodObj)
        console.log(this.state.foodlist.length)
        if(this.state.foodlist.length===0){
            this.setState({foodlist:[...foodObj],filteredfoodlist:[...foodObj]})
        }

    }
    retrieveFoodItems=(baseAPIURL,restaurantName,restaurantURL)=>{
        axios.post(baseAPIURL,{Restaurant_Name:restaurantName,Restaurant_URL:restaurantURL}).then(response=>{
            this.setState({restaurants:response.data})
            console.log(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    updateFilteredList=(action)=>{
        if(action==='veg'){
            const list=this.state.filteredfoodlist.filter((food)=>{
                    return food.Food_Veg_Nveg==="'Veg Item'" || food.Food_Veg_Nveg===" 'Veg Item'"               
            })
            this.setState({filteredfoodlist:list})
        }
    }
    handleSearchChange=(e)=>{
        
        if(this.state.isvegon==false)
        {
        const list=this.state.foodlist.filter((food,index)=>{
            if(this.state.searchtext===''){
                return food
            }
            else{
                return food.Food_Name.toLowerCase().includes(this.state.searchtext)
            }
            
        })
        this.setState({filteredfoodlist:list})
        }


        else
        {    
        const list=this.state.filteredfoodlist.filter((food,index)=>{
            if(this.state.searchtext===''){
                return food
            }
            else{
                return food.Food_Name.toLowerCase().includes(this.state.searchtext)
            }
        })
        this.setState({filteredfoodlist:list})
        }
        //this.setState({filteredfoodlist:list})
        this.setState({searchtext:e.target.value.toLowerCase()})
        this.setState({searchtextactual:e.target.value})
    
    }
    componentDidMount(){
        const baseAPIURL='http://localhost:5000/api/food_list'
        const Restaurant_Name=this.props.location.pathname.split('/')[2].split('-').slice(0,2).join(' ')
        //console.log(Restaurant_Name)
        //console.log(this.props.location.pathname)
        axios.post('http://localhost:5000/api/rest_foodlist',{Restaurant_URL:this.props.location.pathname}).then(response=>{
        console.log(response.data)
        const foodlistlength=response.data.rest_foodlist.Food_Name.length        
        const foodlist_desc=response.data.rest_foodlist.Food_Description.slice(1,response.data.rest_foodlist.Food_Description.length-1).split(",")
        const foodlist_new=response.data.rest_foodlist.Food_Name.slice(1,response.data.rest_foodlist.Food_Name.length-1).split(",")
        const foodlist_price=response.data.rest_foodlist.Food_Price.slice(1,response.data.rest_foodlist.Food_Price.length-1).split(",")
        const foodlist_cat=response.data.rest_foodlist.Food_Cat.slice(1,response.data.rest_foodlist.Food_Cat.length-1).split(",")
        const foodlist_cat_cnt=response.data.rest_foodlist.Food_Cat_Count.slice(1,response.data.rest_foodlist.Food_Cat_Count.length-1).split(",")
        const foodlist_subcat=response.data.rest_foodlist.Food_Subcat.slice(1,response.data.rest_foodlist.Food_Subcat.length-1).split(",")
        const foodlist_subcat_cnt=response.data.rest_foodlist.Food_Subcat_Count.slice(1,response.data.rest_foodlist.Food_Subcat_Count.length-1).split(",")
        const foodlist_veg_nonveg=response.data.rest_foodlist.Food_Veg_Nveg.slice(1,response.data.rest_foodlist.Food_Veg_Nveg.length-1).split(",")
        const foodObj=[]
        for(let i=0;i<foodlist_new.length;i++){
            foodObj.push({Food_Name:foodlist_new[i],Food_Description:foodlist_desc[i],Food_Price:foodlist_price[i],
                Food_Veg_Nveg:foodlist_veg_nonveg[i]
            })
        }
        this.setState({Restaurant_Name:response.data.rest_foodlist.Restaurant_Name,Restaurant_Description:response.data.rest_foodlist.Restaurant_Description,
            Restaurant_Rating:response.data.rest_foodlist.Restaurant_Rating,Restaurant_URL:response.data.rest_foodlist.Restaurant_URL,
            Price_B:response.data.rest_foodlist.Price_B,Offer:response.data.rest_foodlist.Offer,foodlist:[...foodObj],filteredfoodlist:[...foodObj],
            Food_Description:[...foodlist_desc],Food_Price:[...foodlist_price],Food_Cat:[...foodlist_cat],Food_Cat_Count:[...foodlist_cat_cnt],
            Food_Subcat:[...foodlist_subcat],Food_Subcat_Count:[...foodlist_subcat_cnt],Food_Veg_Nveg:[...foodlist_veg_nonveg]
        },()=>{
            console.log(this.state.foodlist)
            
        })
        }).catch((error)=>{
            console.log(error)
            console.log(this.state.foodlist)
            if(this.state.foodlist.length===0){
                this.offlineretriveFoodItems(this.props.location.pathname)
                console.log('Offline trigger')
            }
        })
        //this.retrieveFoodItems(baseAPIURL,,this.props.location.pathname)
    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            <motion.div initial={{opacity:0.,x:-200}}  whileInView={{opacity:1,x:0}} viewport={{once:true}} className='container-fluid shadow-lg pt-5 pb-4' style={{backgroundColor:'#ffaf3f'}}>
                <div className='row'>
                    <div className='col-lg-3 my-3'><img className='shadow-lg rounded-4 placeholder placeholder-wave' style={{width:'18em',height:'18em'}} src={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} alt={this.props.imgAlt}/></div>
                    <div className='col-lg-6 my-3'>
                        {this.state.Restaurant_Name==='PlaceHolder Restaurant'?<div className='placeholder-glow'><h1 className='placeholder' style={this.stylingH1}>{this.state.Restaurant_Name}</h1></div>:<h1 style={this.stylingH1}>{this.state.Restaurant_Name}</h1>}
                        {this.state.Restaurant_Description==='Restaurant Description Placeholder'?<div className='placeholder-glow'><h4 className='placeholder'>{this.state.Restaurant_Description}</h4></div>:<h4>{this.state.Restaurant_Description}</h4>}
                        {/* {this.state.Restaurant_Loc==='Location Placeholder'?<div className='placeholder-glow'><h5 className='placeholder'>{this.state.Restaurant_Loc}</h5></div>:<h5>{this.state.Restaurant_Loc}</h5>} */}
                        <div className='row p-4'>
                            {this.state.Restaurant_Rating==='Rating Placeholder'?<div className='col-3 placeholder-glow'>
                            <div className='placeholder'><i className='bi bi-star-fill' style={{color:this.props.rating>4?"green":"#ef6c00"}}></i> {this.state.Restaurant_Rating}                             
                            </div>
                            </div>:<div className='col-3'>
                            <i className='bi bi-star-fill' style={{color:this.props.rating>4?"green":"#ef6c00"}}></i> {this.state.Restaurant_Rating}                             
                            </div>}
                            <div className='col-1 d-flex'>
                            <div className='vr'></div>
                            </div>
                            
                            <div className='col-4'>
                                Best Seller
                            </div>
                            <div className='col-1 d-flex'>
                            <div className='vr'></div>
                            </div>
                            {this.state.Price_B==='Price B Placeholder'?<div className='col-3 placeholder-glow'>
                            <span className='placeholder' style={{fontSize:"0.8em"}}><i className='bi bi-currency-rupee'></i>{this.state.Price_B}</span>
                            </div>:<div className='col-3'>
                            <span style={{fontSize:"0.8em"}}><i className='bi bi-currency-rupee'></i>{this.state.Price_B}</span>
                            </div>}
                        </div>
                    </div>
                    <div className='col-lg-3 my-3'>
                        <div className='container'>
                            {<h1 style={this.stylingH1}>Offers</h1>}
                            {this.state.Offer==='Offer Placeholder'?<div className='placeholder'>{this.state.Offer}</div>:<div>{this.state.Offer}</div>}
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div  initial={{y:-60}} whileInView={{y:0}} className='sticky-top container pt-4 mt-2 shadow-lg rounded-3 mb-2 pb-2' style={{backgroundColor:'#ffd149',top:'4em'}}>
                <div className='row'>
                <div className='col-9'>
                    <motion.div initial={{y:-60}} whileInView={{y:0}} className='form-floating mb-3 mx-4 shadow-lg'>
                            <input onChange={this.handleSearchChange} name='search' type='text' className='form-control' id='floatingSearchBar' placeholder='Search Restaurants'/>
                            <label htmlFor='floatingSearchBar' className='fw-bold'>Search Items</label>
                    </motion.div>
                </div>  
                <div className='col-3'>
                    <div className='row g-1'>
                        <div className='col fw-bold h3'>Filters:</div>
                        <div className='col'><button onClick={()=>{this.updateFilteredList('veg')}} className='btn btn-secondary shadow-lg'>Veg Only</button>
                        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" onChange={this.handlevegchange} id="flexSwitchCheckDefault"/>
        <label class="form-check-label" for="flexSwitchCheckDefault">Veg only</label>
</div>
                        
                        </div>
                                            
                    </div>
                </div>
                </div>
            </motion.div>
            <div className='container-fluid shadow-lg rounded-2' style={{backgroundColor:'#ffaf4f'}}>
            <div className="row">
            <div key={this.state.mounted} style={{height:'35em',overflowY:'auto'}} className="col-4">
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
                {/* <FoodCard cartItems={this.props.cartItems}  setcartItems={this.props.setcartItems} updateCartItem={this.props.updateCartItem} price={120}  description={'Exclusive food description right for you'} Id={'item-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/> */}
                {this.state.filteredfoodlist.length==0?[<FoodCardPlaceholder key='1' foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>,
                <FoodCardPlaceholder key='2' foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>,
                <FoodCardPlaceholder key='3' foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>,
                <FoodCardPlaceholder key='4' foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>]:this.state.filteredfoodlist.map((food,index)=>{
                if(index==0){
                    //console.log(this.state.filteredfoodlist)
                    return(<FoodCard veg_nonveg={food.Food_Veg_Nveg?.slice(1,food.Food_Veg_Nveg.length-1)} key={index} cartItems={this.props.cartItems}  setcartItems={this.props.setcartItems} updateCartItem={this.props.updateCartItem} price={food.Food_Price?.slice(1,food.Food_Price.length-1)}  description={food.Food_Description?.slice(1,food.Food_Description.length-1)} Id={'item-'+index} foodName={food.Food_Name?.slice(1,food.Food_Name.length-1)} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>)
                }    
                else{
                    return(<FoodCard veg_nonveg={food.Food_Veg_Nveg?.slice(2,food.Food_Veg_Nveg.length-1)} key={index} cartItems={this.props.cartItems}  setcartItems={this.props.setcartItems} updateCartItem={this.props.updateCartItem} price={food.Food_Price?.slice(2,food.Food_Price.length-1)}  description={food.Food_Description?.slice(2,food.Food_Description.length-1)} Id={'item-'+index} foodName={food.Food_Name?.slice(2,food.Food_Name.length-1)} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>)
                }
                }).slice(0,15)}
                
                {/* this.state.foodlist.map((food,index)=>{
                    <FoodCard key={index} Id={'item-'+index+'-1'} foodName={food} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                }) */}
                
                {/* <FoodCardPlaceholder foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-1-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-1-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3-1'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                <FoodCard Id={'item-3-2'} foodName={'HashBrown'} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'img-thumbnail'}/>
                 */}
                </div>
            </div>
            </div>
            </div>
            

            <BottomNavbar/>
        </div>)
    }
}

export default withRouter(withContext(Restaurant));