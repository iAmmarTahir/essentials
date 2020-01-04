import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'
import {URL} from '../webConfig'

class AddItem extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            price: 0,
            image: null,
            quantity: 0,
            location: {lat: 0, lng: 0},
            timeMade: new Date(),
            madeBy: '',
            imgUrl: '',
            imageUploaded: false
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                location: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
        })
        
        Axios.post(URL + 'api/user/getTokenData', {
            token: 'Bearer '.concat(localStorage.getItem('token'))
        })
        .then((res) => {
            this.setState({
                madeBy: res.data.result.id
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleChangeName (e)  {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    
    handleChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    handleChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    handleChangeTimeMade(e) {
        this.setState({
            madeBy: e.target.value
        })
    }

    handleImageChange(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    

    handleUpload(e) {
        const fd = new FormData()
        fd.append('file', this.state.image)
        Axios.post(URL + 'upload', fd).then(
            (res) => {
                this.setState({
                    imageUploaded: true,
                    imgUrl: res.data.file.filename
                })
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault()
        const token = 'Bearer '.concat(localStorage.getItem('token'))
        Axios.post(URL + 'api/thing/addThing', {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.imgUrl,
            quantity: this.state.quantity,
            location: this.state.location,
            timeMade: this.state.timeMade,
            madeBy: this.state.madeBy
        }, {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            this.props.history.push('/home')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {name, description, price, quantity, timeMade} = this.state
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <form onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Item name"
                      value={name}
                      onChange={e => this.handleChangeName(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter item description"
                      value={description}
                      onChange={e => this.handleChangeDescription(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter price"
                      value={price}
                      onChange={e => this.handleChangePrice(e)}
                    />
                  </div>
                  {/** Image */}
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      name="file"
                      type="file"
                      className="form-control"
                      onChange={e => this.handleImageChange(e)}
                      accept="image/*"
                    /> 
                    {
                        this.state.imageUploaded ? (
                            <i className="fas fa-check-circle"></i>
                        ) : (
                            <button type="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
                        )
                    }
                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity (plates)"
                      value={quantity}
                      onChange={e => this.handleChangeQuantity(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Manufactured Date</label>
                    <DateTimePicker
                      onChange={this.handleChangeTimeMade}
                      value={timeMade}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default AddItem;