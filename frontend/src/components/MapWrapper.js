import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import Map from '@arcgis/core/Map.js';
import esriConfig  from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView.js';
import Graphic from  '@arcgis/core/Graphic.js';
import {solve} from  '@arcgis/core/rest/route.js';
import RouteParameters from  '@arcgis/core/rest/support/RouteParameters.js';
import FeatureSet from  '@arcgis/core/rest/support/FeatureSet.js';


class MapWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={mapR:undefined}
        this.mapElement=React.createRef()
        console.log("Mounted")
        //this.mapRef=new ol.Map({target:this.mapElement.current});
        //this.mapRef.current=this.state.mapR
        //this.startLayer;
        //this.endLayer;
        //this.routeLayer;
        //this.currentStep="start";
        //this.startCoords;
        //this.endCoords;
    }
    componentDidMount(){
        // if(this.mapElement.current && !this.mapRef){
        // console.log("Map created")
        //     this.mapRef= new ol.Map({target:this.mapElement.current});
        // }
        
      
          esriConfig.apiKey = "AAPKa80ef46d24ec43c09fe1cadbf8f1cad6Tw4v_az5oO3mlc93UgeMBykmek4n1efQx7lfjPtk0uGjFZohIbgXVSONAAm6ZlWe";
      
          const map = new Map({
            basemap: "arcgis-navigation" //Basemap layer service
          });
      
          const view = new MapView({
            container: "map",
            map: map,
            center: [77.5946,12.9716], //Longitude, latitude
            zoom: 12
          });
      
          const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
      
          view.on("click", function(event){
      
            if (view.graphics.length === 0) {
              addGraphic("origin", event.mapPoint);
            } else if (view.graphics.length === 1) {
              addGraphic("destination", event.mapPoint);
      
              getRoute(); // Call the route service
      
            } else {
              view.graphics.removeAll();
              addGraphic("origin",event.mapPoint);
            }
            console.log(event)
            console.log(event.mapPoint)
      
          });
      
          function addGraphic(type, point) {
            const graphic = new Graphic({
              symbol: {
                type: "simple-marker",
                color: (type === "origin") ? "white" : "black",
                size: "8px"
              },
              geometry: point
            });
            view.graphics.add(graphic);
          }
      
          function getRoute() {
            const routeParams = new RouteParameters({
              stops: new FeatureSet({
                features: view.graphics.toArray()
              }),
      
              returnDirections: true
      
            });
      
            solve(routeUrl, routeParams)
              .then(function(data) {
                data.routeResults.forEach(function(result) {
                  result.route.symbol = {
                    type: "simple-line",
                    color: [5, 150, 255],
                    width: 3
                  };
                  view.graphics.add(result.route);
                });
      
                // Display directions
               if (data.routeResults.length > 0) {
                 const directions = document.createElement("ol");
                  //const directions = React.createElement("ol",null,);
                 directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
                 directions.style.marginTop = "0";
                 directions.style.padding = "15px 15px 15px 30px";
                 const features = data.routeResults[0].directions.features;
      
                 // Show each direction
                 features.forEach(function(result,i){
                   const direction = document.createElement("li");
                   direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
                   directions.appendChild(direction);
                 });
      
                view.ui.empty("top-right");
                view.ui.add(directions, "top-right");
      
               }
      
              })
      
              .catch(function(error){
                  console.log(error);
              })
      
          }
      

      




        // this.mapRef.setView(
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
        // olms(this.mapRef,basemapURL)
        // .then(function (map){
        //     addCircleLayers(map);
        //     addRouteLayer(map);
        // });
        
        // let startLayer,endLayer,routeLayer;

        // function addCircleLayers(map){
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
        // this.mapRef.on("click",(e)=>{
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
        
        // function addRouteLayer(map){
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
        return(<motion.div initial={{opacity:0.2}} whileInView={{opacity:1}} viewport={{once:true}} ref={this.mapElement} style={{height:'28em'}} className='shadow-lg rounded-3 my-4 container map-container' id='map' ></motion.div>)
    }
}

export default MapWrapper;