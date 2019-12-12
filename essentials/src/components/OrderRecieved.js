import React, { useState, Fragment } from 'react';
import Axios from 'axios';

function OrderRecieved(props) {

    const [recieve, setRecieve] = useState('')
    const handleRecieved = () => {
        const token = 'Bearer '.concat(localStorage.getItem('token'))
        Axios.put('http://localhost:4000/api/order/updateStatus', {
            _id: localStorage.getItem('order')
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            localStorage.removeItem('order')
            setRecieve('A billion thanks for using Essentials and being a part of saving World...')
            setTimeout(() => {
                props.history.push('/home')
            }, 2000)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div style={{marginTop: '100px'}} className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div style={{textAlign: 'center'}} className="col-md-6">
                    {
                        recieve ? (
                        <h4>{recieve}</h4>
                        ) : (
                            <Fragment>
                                <h1>Your order is on your way...</h1>
                                <h6>Let us know when you recieve it</h6>
                                <h6>Make the payment to the Delievery Man</h6>
                                <button className="btn btn-primary" onClick={handleRecieved}>Recieved</button>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderRecieved;