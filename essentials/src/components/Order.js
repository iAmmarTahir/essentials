import React, { useEffect, useState } from 'react';
import Axios from 'axios';


function Order(props) {

    const [buyer, setBuyer] = useState('')

    useEffect(() => {
        Axios.post('http://localhost:4000/api/user/getTokenData', {
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
        Axios.post('http://localhost:4000/api/order/addOrder', {
            thing: props.location.state._id,
            buyer: buyer
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            localStorage.setItem('order', res.data.payload._id)
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
                    <img style={{height:'200px', width: '200px'}} src={`http://localhost:4000/${props.location.state.image}`}/>
                    <h1>{props.location.state.name}</h1>  
                    <p>Description: <span style={{fontWeight: 'bold'}}>{props.location.state.description}</span></p>
                    <p>Quantity: <span style={{fontWeight: 'bold'}}>{props.location.state.quantity}</span></p>
                    <p>Price: <span style={{fontWeight: 'bold'}}>Rs. {props.location.state.price}</span></p>
                    <p>Time made: <span style={{fontWeight: 'bold'}}>{props.location.state.timeMade}</span></p>
                    <button onClick={handleOrder}>Order</button>
                </div>
            </div>
        </div>
    );
}

export default Order;