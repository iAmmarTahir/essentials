import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import {URL} from '../webConfig'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    text: {
        marginTop: 5,
        marginBottom: 5
    }
})

function Order(props) {
    const classes = useStyles();

    const [buyer, setBuyer] = useState('')

    useEffect(() => {
        Axios.post(URL + 'api/user/getTokenData', {
                token: 'Bearer '.concat(localStorage.getItem('token'))
            })
            .then((res) => {
               setBuyer(res.data.result.id)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    const handleOrder = () => {
        const token = 'Bearer '.concat(localStorage.getItem('token'))
        Axios.post(URL + 'api/order/addOrder', {
            thing: props.location.state._id,
            buyer: buyer
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            localStorage.setItem('order', res.data.payload._id)
            localStorage.setItem('thing', props.location.state._id)
            props.history.push('/orderRecieved')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Card className={classes.card}>
                        <CardMedia className={classes.media}
                            image = {
                                `${URL + props.location.state.image}`
                            }
                            title={props.location.state.name}
                        >
                        </CardMedia>
                        <CardContent>
                            <Typography className={classes.text} variant="h3">
                                {props.location.state.name}
                            </Typography>
                            <Typography className={classes.text} variant="body1">
                                Description :  
                                {
                                    ' ' + props.location.state.description
                                }
                            </Typography>
                            <Typography className={classes.text} variant="body1">
                                Quantity : 
                                {
                                   ' ' + props.location.state.quantity
                                } {
                                    props.location.state.quantity === 1 ? (<span>plate</span> ) : (<span>plates</span>)
                                }
                            </Typography>
                            <Typography className={classes.text} variant="body1">
                                Price : Rs. {
                                    props.location.state.price
                                }
                            </Typography>
                            <Typography className={classes.text} variant="body1">
                               Time made : {
                                    <Moment format="YYYY-MM-DD HH:mm">{props.location.state.timeMade}</Moment>
                               }
                            </Typography>
                        </CardContent>
                        <Button style={{float: 'right', marginRight: '10px'}} className={classes.text} color="primary" onClick={handleOrder}>Order</Button>
                    </Card>                    
                </div>
            </div>
        </div>
    );
}

export default Order;