import React, { Component } from 'react';
import axios from 'axios';
import './sherbime.css';

class SherbimeShowComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            idService: this.props.match.params.id,
            service: "",
            photos: []
        };
    }
componentWillMount () {
    axios.get("http://localhost:8080/api/service/"+this.state.idService )
    .then((response) => {
       console.log(response.data[0])
        this.setState({service: response.data})
        console.log(this.state.service)

    });

    axios.get("http://localhost:8080/api/photo/allPhotos/"+this.state.idService )
    .then((response) => {
        this.setState({photos: response.data})
        console.log(response.data)
        console.log(this.state.photos)
    });

}
    render(){
        return (
            <div>
          <ul>Name: {this.state.service.name} </ul>
          <ul>ID:{this.state.service.idService} </ul>
          <ul>Description:{this.state.service.description} </ul>
          <ul>Price: {this.state.service.price} </ul>
          <ul>Date: {this.state.service.price} </ul>
          <ul> Reminder:{this.state.service.reminder} </ul>
          <ul>Km: {this.state.service.price} </ul>

          {
            this.state.photos.map(item => {
                return <ul item={item} key={item.photoId}> <img src= {item.photoSrc} /> </ul>
            })
        }
            </div>
        );
    }
}

export default SherbimeShowComponent;
