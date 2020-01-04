import React, { useEffect, useState,Fragment } from 'react';
import Axios from 'axios';
import {URL} from '../webConfig'
import {connect} from 'react-redux'

import {
    makeStyles
} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';




function OrderDetails(props) {

    const [orders, setOrders] = useState([])
    const token = 'Bearer '.concat(localStorage.getItem('token'))
    useEffect(() => {
        Axios.get(URL + 'api/order/getOrders?userId=' + props.user.credentials.result.id, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setOrders(res.data.ans)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <List>
            <h1 className="title">Order Details</h1>
        {
            orders.map((order) => {
                return (
                    <Fragment key={order._id}>
                        <ListItem alignItems="flex-start" >
                            <ListItemAvatar>
                            <Avatar alt = "Remy Sharp" src={`${URL + order.thing.image}`}
                            />
                            </ListItemAvatar>
                                <ListItemText
                                    primary={order.thing.name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                        >
                                            Price: Rs. {order.thing.price}
                                        </Typography>
                                        {` — Quantity: ${order.thing.quantity}`}
                                        {` — Status: ${order.status}`}
                                        
                                        </React.Fragment>
                                    }
                                    />
                        </ListItem>
                        <Divider></Divider>
                    </Fragment>
                )
            })
        }    
        </List>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(OrderDetails);