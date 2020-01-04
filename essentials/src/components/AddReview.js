import StarRatings from 'react-star-ratings'

import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';

import {URL} from '../webConfig'

class AddReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            description: '',
            thing: '',
            reviewBy: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeRating = this.changeRating.bind(this)
    }
    async handleSubmit(e) {
        e.preventDefault()
        await this.setState({
            reviewBy: this.props.user.credentials.result.id,
            thing: localStorage.getItem('thing')
        })
        localStorage.removeItem('thing')
        const token = 'Bearer '.concat(localStorage.getItem('token'))
        console.log(this.state)
        Axios.post(URL + 'api/review/addReview',{
            rating: this.state.rating,
            description: this.state.description,
            thing: this.state.thing,
            reviewBy: this.state.reviewBy
        }, {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            console.log(res.data)
            this.props.history.push('/home')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }
    render() {
        return (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h1 className="title" style={{marginLeft: '25%'}}>Add Review</h1>
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group" style={{marginLeft: '20%'}}>
                      <StarRatings
                        rating={this.state.rating}
                        starRatedColor="rgb(255, 196, 0)"
                        starHoverColor="rgb(255, 196, 0)"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="Rating"
                        starDimension="30px"
                        starSpacing="15px"
                      />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={(e)=> {this.setState({description: e.target.value})}}
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(AddReview);
