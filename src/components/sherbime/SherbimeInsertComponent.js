import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';
import axios from 'axios';
import {BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './sherbime.css';
import { EditorFormatLineSpacing } from 'material-ui';
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";


const selectRowProp = {
    mode: 'checkbox'
  };
  const options = {
    afterDeleteRow: onAfterDeleteRow
  };


  function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
    var apiBaseUrl = "http://localhost:8080/api/service/" ;
    console.log(rowKeys)
    axios.delete(apiBaseUrl+ rowKeys).then(res => {
        console.log(res);
    }, {headers: {
        'Access-Control-Allow-Origin': '*',
      },});

      axios.delete("http://localhost:8080/api/photo"+ rowKeys).then(res => {
        console.log(res);
    }, {headers: {
        'Access-Control-Allow-Origin': '*',
      },});
  }



class SherbimeInsertComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            name:"",
            km: "",
            price: "",
            description: "",
            date : "",
            reminder: "",
            pictures: [],
            userId: "",
            idSherbim: "",
            selectedFile: null,
            idDelete: "",
            allservices: [],
            showCreate: false,
            loggout: false,
            selectedItem: null
        };
        this.viewButtonRender = this.viewButtonRender.bind(this)
        this.editButtonRender = this.editButtonRender.bind(this)
    }

componentWillMount() {
    this.setState({userId: JSON.parse(localStorage.getItem("user")).userId})
    this.setState({email:JSON.parse(localStorage.getItem("user")).email})
    axios.get("http://localhost:8080/api/service/serviceBookList/"+JSON.parse(localStorage.getItem("user")).userId )
    .then((response) => {
        this.setState({allservices: response.data})
    });
}


    showCreate() {
        this.setState({
            selectedItem: false,
            showCreate: !this.state.showCreate,
            name: "",
            price: "",
            km: "",
            date: "",
            description: "",
            reminder: ""
        })
    }
    fileSelectedHandler= event =>{
        console.log(event.target.files[0]);
        this.setState({
        selectedFile: event.target.files[0]
        });

    }

    fileUploadHandler= (id) =>{
        var apiBaseUrl = "http://localhost:8080/api/photo";
        const fd = new FormData();
        console.log("user",this.state.email)
        fd.append('image',this.state.selectedFile , this.state.selectedFile.name );
        fd.append('email',this.state.email)
        fd.append('sherbimeId',id)

        axios.post(apiBaseUrl , fd,null,"application/x-www-form-urlencoded")
        .then(res => {
            console.log(res);
        });
    }


    handleClick(event){
        var apiBaseUrl = "http://localhost:8080/api/service";
        var self = this;
        var payload={
            "name": this.state.name,
            "km": this.state.km,
            "price": this.state.price,
            "description": this.state.description,
            "date" : this.state.date,
            "userId": this.state.userId,
            "reminder" : this.state.reminder
        }
        var photo={
            "photo": this.state.photo,
            "serviceBookId": this.state.serviceBookId
        }
        axios.post(apiBaseUrl, payload)
        .then((response) => {
        if(response.status == 200){
            this.fileUploadHandler(response.data.idService)
            this.setState({allservices: [
                ...this.state.allservices,
                response.data
            ]})
        }
        })
        .catch(function (error) {

        });
        }
deleteStorageHandler (){
    localStorage.clear();
   this.setState({loggout: true});

}
updateHandler(){
    var apiBaseUrl = "http://localhost:8080/api/service";
    var payload={
        "name": this.state.name,
        "km": this.state.km,
        "price": this.state.price,
        "description": this.state.description,
        "date" : this.state.date,
        "reminder" : this.state.reminder,
        "userId"  : this.state.userId,
        "idService" : this.state.selectedItem.idService
    }
    console.log(payload.name)
    axios.put(apiBaseUrl, payload)
    .then((response) =>{
        this.fileUploadHandler(response.data.idService)
    })


}

editButtonRender(cell, row){
    return <button onClick={() => this.onEditClick(row)} className="btn btn-success">Edit</button>
  }
viewButtonRender(cell, row){
    return (<Link to={"/sherbim/" + row.idService}>
    <button className="btn btn-primary">View</button>
    </Link>)
  }

onEditClick(row) {
    this.setState({
        selectedItem: row,
        showCreate: true,
        name: row.name,
        price: row.price,
        km: row.km,
        date: row.date,
        description: row.description,
        reminder: row.reminder
    })
}
    render(){

        return(

        <div className="sherbime-container container-fluid">
        {this.state.loggout && <Redirect to="/" />}
            <div className="enav">
                <div className="add-srv-btn" onClick={this.showCreate.bind(this)}>
                    <div>+</div> New service
                </div>
                <div className="log-out-btn" onClick={this.deleteStorageHandler.bind(this)}>
                    <i className="fas fa-lock" ></i>
                </div>
            </div>
            { this.state.showCreate &&
            <div className="create-sidebar animated fadeInRight">
                    <div className="close-sidebar" onClick={this.showCreate.bind(this)}>X</div>
                    <div className="input-container">
                        <p>Emri: </p>
                        <input type="text" placeholder='' required value={this.state.name} onChange = {(event,newValue) => this.setState({name:event.target.value})}/>
                    </div>
                    <div className="input-container">
                        <p> Cmimi: </p>
                        <input type="text" placeholder="" requried value={this.state.price} onChange = {(event,newValue) => this.setState({price:event.target.value})}/>
                    </div>
                    <div className="input-container">
                        <p> Date: </p>
                        <input type="text" placeholder="format : yyyy-mm-dd" value={this.state.date} requried onChange = {(event,newValue) => this.setState({date:event.target.value})}/>
                    </div>
                    <div className="input-container">
                        <p> Reminder: </p>
                        <input type="text" placeholder="format: yyyy-mm-dd" value={this.state.reminder} requried onChange = {(event,newValue) => this.setState({reminder:event.target.value})}/>
                    </div>
                    <div>
                        <p> Km: </p>
                        <input type="text" placeholder="" requried value={this.state.km} onChange = {(event,newValue) => this.setState({km:event.target.value})}/>
                    </div>
                    <div>
                        <p> Pershkrimi: </p>
                        <input type="text" placeholder="" value={this.state.description} requried onChange = {(event,newValue) => this.setState({description:event.target.value})}/>
                    </div>
                    <input type="file" onChange={this.fileSelectedHandler} />
                    {
                        !this.state.selectedItem &&
                        <button classname="green-btn" type="submit"  onClick={(event) => this.handleClick(event)}  >Ruaj </button>
                    }
                    {
                        this.state.selectedItem &&
                        <button classname="green-btn" type="submit"  onClick={this.updateHandler.bind(this)}  >Update </button>
                    }
                </div>
                }
                <BootstrapTable data={ this.state.allservices } deleteRow={ true }  selectRow={ selectRowProp } striped={true} hover={true}  options={ options } >
                    <TableHeaderColumn dataField='idService' isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' width="100" dataFormat={this.editButtonRender}>Edit</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' width="100" dataFormat={this.viewButtonRender}>View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default SherbimeInsertComponent;
