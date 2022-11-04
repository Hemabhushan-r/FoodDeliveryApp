import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {motion} from 'framer-motion';

class MapWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={mapR:undefined}
        this.mapElement=React.createRef()
        console.log("Mounted")
        this.mapRef=new ol.Map({target:this.mapElement.current});
        //this.mapRef.current=this.state.mapR
        this.startLayer;
        this.endLayer;
        this.routeLayer;
        this.currentStep="start";
        this.startCoords;
        this.endCoords;
    }
    componentDidMount(){
        // if(this.mapElement.current && !this.mapRef){
        // console.log("Map created")
        //     this.mapRef= new ol.Map({target:this.mapElement.current});
        // }
        
        this.mapRef.setView(
            new ol.View({
                center: ol.proj.fromLonLat([-79.3832, 43.6532]),
                zoom: 12,
                wrapX:false,
                wrapY:false
            })
        )
        const apiKey="AAPKa80ef46d24ec43c09fe1cadbf8f1cad6Tw4v_az5oO3mlc93UgeMBykmek4n1efQx7lfjPtk0uGjFZohIbgXVSONAAm6ZlWe";
        const basemapId="ArcGIS:Navigation";
        const basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey;
        olms(this.mapRef,basemapURL)
        .then(function (map){
            addCircleLayers(map);
            addRouteLayer(map);
        });
        
        let startLayer,endLayer,routeLayer;

        function addCircleLayers(map){
            startLayer = new ol.layer.Vector({
                style:new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color:"white"}),
                        stroke: new ol.style.Stroke({color:"black",width:2})
                    })
                })
            });
            map.addLayer(startLayer);
            endLayer = new ol.layer.Vector({
                style:new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({color:"black"}),
                        stroke: new ol.style.Stroke({color:"white",width:2})
                    })
                })
            });
            map.addLayer(endLayer);


        }
        let currentStep="start";
        let startCoords,endCoords;

        const geojson = new ol.format.GeoJSON({
            defaultDataProjection:"EPSG:4326",
            featureProjection:"EPSG:3857"
        })
        this.mapRef.on("click",(e)=>{
            const coordinates = ol.proj.transform(e.coordinate,"EPSG:3857","EPSG:4326");
            const point = {
                type:"Point",
                coordinates
            };

            if( currentStep === "start"){
                startLayer.setSource(
                    new ol.source.Vector({
                        features:geojson.readFeatures(point)
                    })
                );
                startCoords=coordinates;
                
                if(endCoords){
                    endCoords=null;
                    endLayer.getSource().clear();
                    routeLayer.getSource().clear();
                }

                currentStep="end";
            }
            else{
                endLayer.setSource(
                    new ol.source.Vector({
                        features:geojson.readFeatures(point)
                    })
                );
                endCoords=coordinates;
                currentStep="start";
                updateRoute(startCoords,endCoords);
            }
        });
        
        function addRouteLayer(map){
            routeLayer= new ol.layer.Vector({
                style: new ol.style.Style({
                    stroke:new ol.style.Stroke({
                        color:"hsl(205, 100%, 50%)",
                        width:4,
                        opacity:0.6
                    })
                })
            });
            map.addLayer(routeLayer);
        }
        function updateRoute(){
            const authentication=arcgisRest.ApiKeyManager.fromKey(apiKey);
            arcgisRest
            .solveRoute({
                stops:[startCoords,endCoords],
                authentication
            })
            .then((response) => {
                routeLayer.setSource(
                    new ol.source.Vector({
                        features:geojson.readFeatures(response.routes.geoJson)
                    })
                );
            })
            .catch((error) => {
                alert("There was a problem using the geocoder. See the console for details.");
                console.error(error);
            })
        }

    }
    render(){
        return(<motion.div initial={{opacity:0.2}} whileInView={{opacity:1}} viewport={{once:true}} ref={this.mapElement} style={{height:'28em'}} className='shadow-lg rounded-3 my-4 container map-container' id='map' ></motion.div>)
    }
}

export default MapWrapper;