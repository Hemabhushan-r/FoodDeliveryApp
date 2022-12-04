import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {motion} from 'framer-motion'
import axios from 'axios';
import withContext from './withContext';

class CoordinatesInput extends React.Component{
    constructor(props){
        super(props)
        this.state={latitude:0,longitude:0}
    }
    handleLatitudeChange=(e)=>{
        this.setState({latitude:e.target.value})
    }
    handleLongitudeChange=(e)=>{
        this.setState({longitude:e.target.value})
    }
    sendCoords=(e)=>{
        e.preventDefault()
        console.log('In CoordinatesInput')
        this.props.handleCoordsChange(this.state.latitude,this.state.longitude)
    }
    render(){
        return(<div className='container'>
        <div className='row'>
            <div className='col'>
                <div class="form-floating mb-3">
                <input type="number" onChange={this.handleLatitudeChange} className="form-control" id="floatinglatitude" placeholder="latitude"/>
                <label for="floatinglatitude">Latitude</label>
                </div>
            </div>
            <div className='col'>
                <div class="form-floating mb-3">
                <input type="number" onChange={this.handleLongitudeChange} className="form-control" id="floatinglongitude" placeholder="longitude"/>
                <label for="floatinglongitude">Longitude</label>
                </div>
            </div>
            <div className='col'>
                <button className='btn btn-secondary' onClick={this.sendCoords}>Send Coordinates</button>
            </div>
        </div>
    </div>)
    }
}
export default CoordinatesInput;