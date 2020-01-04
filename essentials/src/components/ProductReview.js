import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import {URL} from '../webConfig'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StarRatings from 'react-star-ratings'

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

function ProductReview(props) {
    const [reviews, setReviews] = useState([])
    const token = 'Bearer '.concat(localStorage.getItem('token'))
    useEffect(() => {
        Axios.get(URL + 'api/review/productReview?id=' + props.location.state._id, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setReviews(res.data.result.reviews)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <List>
<h1 className="title">{props.location.state.name}'s Reviews</h1>
            {
                reviews.length === 0 ? (<p>No reviews yet...</p>): (
                    reviews.map((review) => (
                        <Fragment key={review._id}>
                            <ListItem alignItems="flex-start" >
                                <ListItemAvatar>
                                    <StarRatings
                                        rating={review.rating}
                                        starDimension = "20px"
                                        starSpacing = "5px"
                                        starRatedColor = 'rgb(255, 196, 0)'
                                    />
                                </ListItemAvatar>
                                    <ListItemText
                                        primary={review.description}
                                        style={{paddingTop: '10px', paddingLeft: '40px'}}
                                    />
                            </ListItem>
                            <Divider></Divider>
                        </Fragment>
                    ))
                )
            }
        </List>
    );
}

export default ProductReview;