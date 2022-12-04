import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link, Navigate} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';
import withContext from './withContext';
import CoordinatesInput from './CoordinatesInput';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot,setDoc } from "firebase/firestore";

class DeliveryStatus extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH={fontFamily:'Cookie'}
        this.latitude=0
        this.longitude=0
        this.state={cart:this.props.cartItems,cartSum:this.props.cartItems?.reduce((accumulator,item)=>{
            return accumulator+parseInt(item.count)*parseInt(item.price)
        },0),cartDC:25,cartTax:0,cartTotal:0,restaurants:[],Deliveryperson_Name:'DeliveryPersonName'
        ,Deliveryperson_Num:'DeliveryPersonNumber',Deliveryperson_Email:'DeliveryPersonEmail'
        ,Customer_Name:'CustomerName'
        ,Customer_Num:'CustomerNumber',Customer_Email:'CustomerEmail',user:JSON.parse(localStorage.getItem('profile')),IsDelivered:false,deliveryTime:'8:30 PM'}
    }
    handleDeliveryComplete=(e)=>{
        e.preventDefault()
        const firebaseConfig = {
            apiKey: "AIzaSyBPwXAaejCV-30S3kWuFW1PvcQhCpp_AUI",
            authDomain: "fooddeliveryapp-366415.firebaseapp.com",
            projectId: "fooddeliveryapp-366415",
            storageBucket: "fooddeliveryapp-366415.appspot.com",
            messagingSenderId: "146665827801",
            appId: "1:146665827801:web:03dffdefe24c9a3952fdc8",
            measurementId: "G-4S945XMC9W"
          };
  
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
          const db=getFirestore(app);
          if(this.state.user.result.role==='customer'){
            setDoc(doc(db,'delivery-updates','p7u1sQ7eJqnf2m5kIgoe'),{
              IsDelivered:false
            },{merge:true})
          }
        const baseAPIURL='https://fooddeliveryappbackend.onrender.com/api/deletecartItems'
        axios.post(baseAPIURL,{name:this.state.user?.result.name,email:this.state.user?.result.email})
        .then((response)=>{
            console.log(response)
            localStorage.setItem('profile',JSON.stringify({...this.state.user,cartItems:[]}))
            this.props.setcartItems([])
            this.props.navigate('/')
        })
    }
    handleDeliveryUpdate=(e)=>{
        e.preventDefault()
        const firebaseConfig = {
            apiKey: "AIzaSyBPwXAaejCV-30S3kWuFW1PvcQhCpp_AUI",
            authDomain: "fooddeliveryapp-366415.firebaseapp.com",
            projectId: "fooddeliveryapp-366415",
            storageBucket: "fooddeliveryapp-366415.appspot.com",
            messagingSenderId: "146665827801",
            appId: "1:146665827801:web:03dffdefe24c9a3952fdc8",
            measurementId: "G-4S945XMC9W"
          };
  
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
          const db=getFirestore(app);
          if(this.state.user.result.role==='delivery-personnel'){
            setDoc(doc(db,'delivery-updates','p7u1sQ7eJqnf2m5kIgoe'),{
              IsDelivered:true
            },{merge:true})
          }
    }
    handleDeliveryPersonCoordsChange=(Coords)=>{
        const firebaseConfig = {
            apiKey: "AIzaSyBPwXAaejCV-30S3kWuFW1PvcQhCpp_AUI",
            authDomain: "fooddeliveryapp-366415.firebaseapp.com",
            projectId: "fooddeliveryapp-366415",
            storageBucket: "fooddeliveryapp-366415.appspot.com",
            messagingSenderId: "146665827801",
            appId: "1:146665827801:web:03dffdefe24c9a3952fdc8",
            measurementId: "G-4S945XMC9W"
          };
  
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
          const db=getFirestore(app);
        if(this.state.user.result.role==='delivery-personnel'){
          setDoc(doc(db,'location-updates','Ucv5lqFwPBSUCJXeD8HQ'),{
            source:{
              location:{
                lat:parseFloat(Coords.latitude),
                lng:parseFloat(Coords.longitude)
              }
            }
          },{merge:true})
        }
      }
    handleCoordsChange=(latitude,longitude)=>{
        this.handleDeliveryPersonCoordsChange({latitude:latitude,longitude:longitude})
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
    retrieveDeliveryPerson=(baseAPIURL)=>{
        axios.post(baseAPIURL,{cust_name:this.state.user.result.name,cust_num:this.state.user.result.number,cust_email:this.state.user.result.email,
        cartDetails:{cartItems:this.state.cart,
            cartSum:this.state.cartSum,cartDC:this.state.cartDC,cartTax:this.state.cartTax,cartTotal:this.state.cartTotal}}).then(response=>{
            const deliveryperson=response.data
            this.setState({Deliveryperson_Name:deliveryperson?.name
                ,Deliveryperson_Num:deliveryperson?.number
            ,Deliveryperson_Email:deliveryperson.email})
            console.log(response.data)
        })
    }
    retrieveCustomer=(baseAPIURL)=>{
        axios.post(baseAPIURL,{deliveryperson_name:this.state.user?.result.name
            ,deliveryperson_num:this.state.user?.result.number
            ,deliveryperson_email:this.state.user?.result.email})
            .then((response)=>{
                const customer_data=response.data;
                this.setState({
                    Customer_Name:customer_data.name,Customer_Num:customer_data.number,Customer_Email:customer_data.email
                    ,cartItems:customer_data.cartDetails.cartItems,
                    cartDC:customer_data.cartDetails.cartDC,
                    cartSum:customer_data.cartDetails.cartSum,cartTax:customer_data.cartDetails.cartTax,
                    cartTotal:customer_data.cartDetails.cartTotal
                })
            })
    }
    componentDidMount(){
        console.log(this.props)
        // const map= new ol.Map({target:"map"});
        // const baseAPIURL='https://fooddeliveryappbackend.onrender.com/api/restaurant_list'
        // this.retrieveRestaurants(baseAPIURL)
        // map.setView(
        //     new ol.View({
        //         center: ol.proj.fromLonLat([-79.3832, 43.6532]),
        //         zoom: 12,
        //         wrapX:false,
        //         wrapY:false
        //     })
        // )
        // const apiKey="AAPKa80ef46d24ec43c09fe1cadbf8f1cad6Tw4v_az5oO3mlc93UgeMBykmek4n1efQx7lfjPtk0uGjFZohIbgXVSONAAm6ZlWe";
        // const basemapId="ArcGIS:Navigation";
        // const basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey;
        // olms(map,basemapURL)
        // .then(function (map){
        //     addCircleLayers();
        //     addRouteLayer();
        // });
        // this.setState({newobj:"set"})
        // let startLayer,endLayer,routeLayer;

        // function addCircleLayers(){
        //     startLayer = new ol.layer.Vector({
        //         style:new ol.style.Style({
        //             image: new ol.style.Circle({
        //                 radius: 6,
        //                 fill: new ol.style.Fill({color:"white"}),
        //                 stroke: new ol.style.Stroke({color:"black",width:2})
        //             })
        //         })
        //     });
        //     map.addLayer(startLayer);
        //     endLayer = new ol.layer.Vector({
        //         style:new ol.style.Style({
        //             image: new ol.style.Circle({
        //                 radius: 7,
        //                 fill: new ol.style.Fill({color:"black"}),
        //                 stroke: new ol.style.Stroke({color:"white",width:2})
        //             })
        //         })
        //     });
        //     map.addLayer(endLayer);


        // }
        // let currentStep="start";
        // let startCoords,endCoords;

        // const geojson = new ol.format.GeoJSON({
        //     defaultDataProjection:"EPSG:4326",
        //     featureProjection:"EPSG:3857"
        // })
        // map.on("click",(e)=>{
        //     const coordinates = ol.proj.transform(e.coordinate,"EPSG:3857","EPSG:4326");
        //     const point = {
        //         type:"Point",
        //         coordinates
        //     };

        //     if( currentStep === "start"){
        //         startLayer.setSource(
        //             new ol.source.Vector({
        //                 features:geojson.readFeatures(point)
        //             })
        //         );
        //         startCoords=coordinates;
                
        //         if(endCoords){
        //             endCoords=null;
        //             endLayer.getSource().clear();
        //             routeLayer.getSource().clear();
        //         }

        //         currentStep="end";
        //     }
        //     else{
        //         endLayer.setSource(
        //             new ol.source.Vector({
        //                 features:geojson.readFeatures(point)
        //             })
        //         );
        //         endCoords=coordinates;
        //         currentStep="start";
        //         updateRoute(startCoords,endCoords);
        //     }
        // });
        
        // function addRouteLayer(){
        //     routeLayer= new ol.layer.Vector({
        //         style: new ol.style.Style({
        //             stroke:new ol.style.Stroke({
        //                 color:"hsl(205, 100%, 50%)",
        //                 width:4,
        //                 opacity:0.6
        //             })
        //         })
        //     });
        //     map.addLayer(routeLayer);
        // }
        // function updateRoute(){
        //     const authentication=arcgisRest.ApiKeyManager.fromKey(apiKey);
        //     arcgisRest
        //     .solveRoute({
        //         stops:[startCoords,endCoords],
        //         authentication
        //     })
        //     .then((response) => {
        //         routeLayer.setSource(
        //             new ol.source.Vector({
        //                 features:geojson.readFeatures(response.routes.geoJson)
        //             })
        //         );
        //     })
        //     .catch((error) => {
        //         alert("There was a problem using the geocoder. See the console for details.");
        //         console.error(error);
        //     })
        // }
                const cartSum=this.props.cartItems?.reduce((accumulator,item)=>{
                    return accumulator+parseInt(item.count)*parseInt(item.price)
                },0)
                const cartTax=cartSum*0.18
                const cartTotal=cartSum+cartTax+this.state.cartDC
                this.setState({cart:this.props.cartItems,cartSum:cartSum,cartTax:cartTax,cartTotal:cartTotal},()=>{
                    if(this.state.user?.result.role==='customer'){
                        this.retrieveDeliveryPerson('https://fooddeliveryappbackend.onrender.com/api/getdeliveryperson')
                    }
                    else if(this.state.user?.result.role==='delivery-personnel'){
                        this.retrieveCustomer('https://fooddeliveryappbackend.onrender.com/api/getcustomer')
                    }
                })

        const baseAPIURL='https://fooddeliveryappbackend.onrender.com/api/restaurant_list'
        this.retrieveRestaurants(baseAPIURL)
        const firebaseConfig = {
            apiKey: "AIzaSyBPwXAaejCV-30S3kWuFW1PvcQhCpp_AUI",
            authDomain: "fooddeliveryapp-366415.firebaseapp.com",
            projectId: "fooddeliveryapp-366415",
            storageBucket: "fooddeliveryapp-366415.appspot.com",
            messagingSenderId: "146665827801",
            appId: "1:146665827801:web:03dffdefe24c9a3952fdc8",
            measurementId: "G-4S945XMC9W"
          };
  
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
          const db=getFirestore(app);
        const unsub = onSnapshot(doc(db, "delivery-updates", "p7u1sQ7eJqnf2m5kIgoe"), (doc) => {
            const firebasedoc=doc.data()
            console.log(firebasedoc)
            if(firebasedoc.IsDelivered==true){
                this.setState({IsDelivered:true})
            }
        })
            
        const d=new Date()
        d.setMinutes(d.getMinutes()+45)
        this.setState({deliveryTime:d.toLocaleTimeString()})
        
    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            <div className='mb-2 pb-2'>
                {this.state.user?.result.role==='customer'?<><h1 className='pt-5' style={this.stylingH}>Order Overview </h1>
                <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='vstack gap-2'>
                    <ul className='list-unstyled mx-auto'>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Order Placed  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Your food is being Prepared  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Your food is out to be delivered by</i></li>
                        <li style={{fontSize:'1.2em'}}> {this.state.Deliveryperson_Name}    <span className='badge bg-black rounded-pill'>in 45 Min</span></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}>{this.state.IsDelivered===false?<span> Your food is yet to be delivered</span>:<span> Your food has been delivered<button onClick={this.handleDeliveryComplete} className='btn btn-success'>Click here to finish</button></span>} <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li>  <span className='badge bg-black rounded-pill' style={{fontSize:'1.1em'}}>at {this.state.deliveryTime}</span></li>
                    </ul>
                </motion.div></>
                :<><h1 className='pt-5' style={this.stylingH}>Order Overview </h1>
                <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='vstack gap-2'>
                    <ul className='list-unstyled mx-auto'>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Order Placed  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Customer food is being Prepared  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Food is to be delivered to</i></li>
                        <li style={{fontSize:'1.2em'}}> {this.state.Customer_Name}    <span className='badge bg-black rounded-pill'>in 45 Min</span></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Is Customer Food delivered <button onClick={this.handleDeliveryUpdate} className='btn btn-secondary'>Delivered</button>  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li>  <span className='badge bg-black rounded-pill' style={{fontSize:'1.1em'}}>at {this.state.deliveryTime}</span></li>
                    </ul>
                </motion.div> 
                <CoordinatesInput handleCoordsChange={this.handleCoordsChange}/>               
                </>}
                <div className='container-fluid'>
                    <MapWrapper user={this.state.user} deliverypCoords={{latitude:this.latitude,longitude:this.longitude}}/>
                {/* <div className='container' id='map'   style={{width:'100%',marginBottom:'25em',height:'20em',fontFamily:'Arial,Helvetica, sans-serif',fontSize:'14px',color:'#323232'}}></div> */}
                </div>
                <div className='container'>
                    <div className='row'>
                    <div className='col-lg-4'><h4>Order Details</h4></div>
                    <div className='col-lg-4 '>
                        <ol className='list-group list-group-numbered shadow-lg' style={{color:'#fb8c00'}}>
                            {this.state.user?.result.role=='customer'?this.props.cartItems.map((fooditem)=>{
                                return  <li className='list-group-item d-flex justify-content-between align-items-start' style={{backgroundColor:'#ffaf3f'}}><div className='ms-2 me-auto'>{fooditem.foodName}</div> <span className='badge bg-secondary rounded-pill'>x{fooditem.count}</span><span className='ms-2'><i className='bi bi-currency-rupee'></i>{fooditem.price}</span></li>
                            })
                            :this.state.cartItems?.map((fooditem)=>{
                                return  <li className='list-group-item d-flex justify-content-between align-items-start' style={{backgroundColor:'#ffaf3f'}}><div className='ms-2 me-auto'>{fooditem.foodName}</div> <span className='badge bg-secondary rounded-pill'>x{fooditem.count}</span><span className='ms-2'><i className='bi bi-currency-rupee'></i>{fooditem.price}</span></li>
                            })}
                            
                        </ol>
                        <ul className='list-unstyled'>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Sum</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>{this.state.cartSum}</span></li>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Delivery Charges</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>25</span></li>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Tax</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>{this.state.cartTax}</span></li>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Total</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>{this.state.cartTotal}</span></li>
                        </ul>
                    </div>
                    <div className='col-lg-4'>
                        <h4>Contact Details</h4>
                        {this.state.user?.result.role==='delivery-personnel'?
                        <div className='card shadow-lg' style={{backgroundColor:'#ffaf3f'}}>
                        <div className='card-body'>
                        <img className='img-thumbnail float-start rounded d-inline' src='https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg' alt='img-thumbail' style={{height:'4em',width:'4em'}}/>
                            <div className='row'>
                                <div className='col'>
                                <h5 className='card-title'>{this.state.Customer_Name}</h5>
                            <p className='card-text'>Ph No:{this.state.Customer_Num} </p>
                            <p className='card-text'>Email:{this.state.Customer_Email} </p>
                                </div>
                                <div className='col-2'><i className='bi bi-telephone-outbound rounded px-2 py-1 bg-warning shadow-lg fs-4'></i></div>
                            </div>
                        </div>
                    </div>
                        :<div className='card shadow-lg' style={{backgroundColor:'#ffaf3f'}}>
                            <div className='card-body'>
                            <img className='img-thumbnail float-start rounded d-inline' src='https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg' alt='img-thumbail' style={{height:'4em',width:'4em'}}/>
                                <div className='row'>
                                    <div className='col'>
                                    <h5 className='card-title'>{this.state.Deliveryperson_Name}</h5>
                                <p className='card-text'>Ph No:{this.state.Deliveryperson_Num} </p>
                                <p className='card-text'>Email:{this.state.Deliveryperson_Email} </p>
                                    </div>
                                    <div className='col-2'><i className='bi bi-telephone-outbound rounded px-2 py-1 bg-warning shadow-lg fs-4'></i></div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <h2 style={this.stylingH}>Wanna Order Some More</h2>
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
            <div className='container-fluid  mt-4 mb-2 py-4 shadow-lg'style={{backgroundColor:'#ef6c00'}}>
                <div className='container '>
                <div className='row'>
                    <div className='col-lg-3 mb-3'>
                        <h4>QuickFood</h4>
                        <ul className='list-unstyled'>
                            <li className='mb-2'><i className='bi bi-c-circle'></i> 2022-2022</li>
                            <li className='mb-2'>Privacy terms</li>
                            <li className='mb-2'>Delivery Compliancy</li>
                        </ul>
                        
                    </div>
                    <div className='col-6 col-lg-2 mb-3'>
                        <h6>Product</h6>
                        <ul className='list-unstyled'>
                            <li className='mb-2'>Product1</li>
                            <li className='mb-2'>Product2</li>
                            <li className='mb-2'>Product3</li>
                        </ul>
                        
                    </div>
                    <div className='col-6 col-lg-2 mb-3'>
                        <h6>Team</h6>
                        <ul className='list-unstyled'>
                            <li className='mb-2'>Member 1</li>
                            <li className='mb-2'>Member 2</li>
                            <li className='mb-2'>Member 3</li>
                        </ul>
                        
                    </div>
                    <div className='col-6 col-lg-2 mb-3'>
                        <h6>City</h6>
                        <ul className='list-unstyled'>
                            <li className='mb-2'>City 1</li>
                            <li className='mb-2'>City 2</li>
                            <li className='mb-2'>City 3</li>
                        </ul>
                        
                    </div>
                    <div className='col-6 col-lg-2 mb-3'>
                        <h6>Countries</h6>
                        <ul className='list-unstyled'>
                            <li className='mb-2'>Country 1</li>
                            <li className='mb-2'>Country 2</li>
                            <li className='mb-2'>Country 3</li>
                        </ul>
                        
                    </div>
                    
                </div>
                </div>
            </div>
        </div>)
    }
}
export default withContext(DeliveryStatus);