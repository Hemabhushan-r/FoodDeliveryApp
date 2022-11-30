import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import MapWrapper from './MapWrapper';
import {motion} from 'framer-motion'
import RestaurantCard from './RestaurantCard';
import RestaurantCardPlaceholder from './RestaurantCardPlaceholder';
import axios from 'axios';

class DeliveryStatus extends React.Component{
    constructor(props){
        super(props)
        this.styling={backgroundColor:'#fb8c00'}
        this.stylingH={fontFamily:'Cookie'}
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
        // const map= new ol.Map({target:"map"});
        // const baseAPIURL='http://localhost:5000/api/restaurant_list'
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

    }
    render(){
        return(<div className='container-fluid mt-2 pt-5 pb-0 w-100 px-0' style={this.styling}>
            <div className='mb-2 pb-2'>
                <h1 className='pt-5' style={this.stylingH}>Order No : </h1>
                <motion.div initial={{opacity:0.2}}  whileInView={{opacity:1}} viewport={{once:true}} className='vstack gap-2'>
                    <ul className='list-unstyled mx-auto'>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Order Placed  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Your food is being Prepared  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Your food is out to be delivered by</i></li>
                        <li style={{fontSize:'1.2em'}}> DeliveryPersonName    <span className='badge bg-black rounded-pill'>in 15 Min</span></li>
                        <li className='d-flex align-items-start'><i className='bi bi-arrow-return-right' style={{fontSize:'1.5em'}}> Your food has been delivered  <i className='bi bi-check2-circle' style={{color:'lightgreen'}}></i></i></li>
                        <li>  <span className='badge bg-black rounded-pill' style={{fontSize:'1.1em'}}>at 8:30 PM</span></li>
                    </ul>
                </motion.div>
                <div className='container-fluid'>
                    <MapWrapper/>
                {/* <div className='container' id='map'   style={{width:'100%',marginBottom:'25em',height:'20em',fontFamily:'Arial,Helvetica, sans-serif',fontSize:'14px',color:'#323232'}}></div> */}
                </div>
                <div className='container'>
                    <div className='row'>
                    <div className='col-lg-4'><h4>Order Details</h4></div>
                    <div className='col-lg-4 '>
                        <ol className='list-group list-group-numbered shadow-lg' style={{color:'#fb8c00'}}>
                            <li className='list-group-item d-flex justify-content-between align-items-start' style={{backgroundColor:'#ffaf3f'}}><div className='ms-2 me-auto'>Food1</div> <span className='badge bg-secondary rounded-pill'>x1</span><span className='ms-2'><i className='bi bi-currency-rupee'></i>60</span></li>
                            <li className='list-group-item d-flex justify-content-between align-items-start' style={{backgroundColor:'#ffaf3f'}}><div className='ms-2 me-auto'>Food2</div> <span className='badge bg-secondary rounded-pill'>x1</span><span className='ms-2'><i className='bi bi-currency-rupee'></i>40</span></li>
                            <li className='list-group-item d-flex justify-content-between align-items-start' style={{backgroundColor:'#ffaf3f'}}><div className='ms-2 me-auto'>Food3</div> <span className='badge bg-secondary rounded-pill'>x1</span><span className='ms-2'><i className='bi bi-currency-rupee'></i>20</span></li>
                        </ol>
                        <ul className='list-unstyled'>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Delivery Charges</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>20</span></li>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Tax</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>44</span></li>
                            <li className='list-item d-flex justify-content-between align-items-start'><div className='ms-2 me-auto'>Total</div> <span className='mx-3'><i className='bi bi-currency-rupee'></i>184</span></li>
                        </ul>
                    </div>
                    <div className='col-lg-4'>
                        <h4>Contact Details</h4>
                        <div className='card shadow-lg' style={{backgroundColor:'#ffaf3f'}}>
                            <div className='card-body'>
                            <img className='img-thumbnail float-start rounded d-inline' src='https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg' alt='img-thumbail' style={{height:'4em',width:'4em'}}/>
                                <div className='row'>
                                    <div className='col'>
                                    <h5 className='card-title'>DeliveryPersonName</h5>
                                <p className='card-text'>Phone Number:+91..... </p>
                                    </div>
                                    <div className='col-2'><i className='bi bi-telephone-outbound rounded px-2 py-1 bg-warning shadow-lg fs-4'></i></div>
                                </div>
                            </div>
                        </div>
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
                        return(<RestaurantCard key={restaurant.index} restaurantName={restaurant.Restaurant_Name} restaurantDesc={restaurant.Restaurant_Description} rating={restaurant.Restaurant_Rating} imgSrc={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'} imgAlt={'food-thumbnail'} priceB={restaurant.Price_B}/>)
                    })}
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
export default DeliveryStatus;