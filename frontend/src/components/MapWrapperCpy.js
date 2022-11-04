import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

class MapWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={mapR:undefined}
        this.mapElement=React.createRef()
        this.mapRef=React.createRef()
        this.mapRef.current=this.state.mapR
        this.startLayer;
        this.endLayer;
        this.routeLayer;
        this.currentStep="start";
        this.startCoords;
        this.endCoords;
    }
    //let startLayer;
    //let endLayer;
    //let routeLayer;
    //currentStep="start";
    //startCoords;
    //endCoords;
    addCircleLayers=()=>{
        this.startLayer = new ol.layer.Vector({
            style:new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({color:"white"}),
                    stroke: new ol.style.Stroke({color:"black",width:2})
                })
            })
        });
        this.state.mapR.addLayer(this.startLayer);
        // this.setState((prevState)=>{
        //     prevState.mapR.addLayer(this.startLayer)
        //     return {mapR:prevState.mapR}
        // })
        this.endLayer = new ol.layer.Vector({
            style:new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color:"black"}),
                    stroke: new ol.style.Stroke({color:"white",width:2})
                })
            })
        });
        //this.state.mapR.addLayer(this.endLayer);
        this.setState((prevState)=>{
            prevState.mapR.addLayer(this.endLayer)
            return {mapR:prevState.mapR}
        })

    }
    addRouteLayer=()=>{
        this.routeLayer= new ol.layer.Vector({
            style: new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color:"hsl(205, 100%, 50%)",
                    width:4,
                    opacity:0.6
                })
            })
        });
        //this.state.mapR.addLayer(this.routeLayer);
        this.setState((prevState)=>{
            prevState.mapR.addLayer(this.routeLayer)
            return {mapR:prevState.mapR}
        })
    }
    updateRoute=(apiKey,geojson)=>{
        const authentication=arcgisRest.ApiKeyManager.fromKey(apiKey);
        arcgisRest
        .solveRoute({
            stops:[this.startCoords,this.endCoords],
            authentication
        })
        .then((response) => {
            this.routeLayer.setSource(
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
    componentDidMount(){
        const map= new ol.Map({target:this.mapElement.current});
        const addCircleLayersF=this.addCircleLayers
        const addRouteLayerF=this.addRouteLayer
        map.setView(
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
        olms(map,basemapURL)
        .then((map)=>{
            addCircleLayersF();
            addRouteLayerF();
        });
        

        const geojson = new ol.format.GeoJSON({
            defaultDataProjection:"EPSG:4326",
            featureProjection:"EPSG:3857"
        })
        map.on("click",(e)=>{
            const coordinates = ol.proj.transform(e.coordinate,"EPSG:3857","EPSG:4326");
            const point = {
                type:"Point",
                coordinates
            };

            if( this.currentStep === "start"){
                this.startLayer.setSource(
                    new ol.source.Vector({
                        features:geojson.readFeatures(point)
                    })
                );
                this.startCoords=coordinates;
                
                if(this.endCoords){
                    this.endCoords=null;
                    this.endLayer.getSource().clear();
                    this.routeLayer.getSource().clear();
                }

                this.currentStep="end";
            }
            else{
                this.endLayer.setSource(
                    new ol.source.Vector({
                        features:geojson.readFeatures(point)
                    })
                );
                this.endCoords=coordinates;
                this.currentStep="start";
                this.updateRoute(apiKey,geojson);
            }
        });
        this.setState({mapR:map})
    }
    render(){
        return(<div style={{height:'20em'}} className='container map-container my-2' id='map' ref={this.mapElement}></div>)
    }
}
export default MapWrapper;