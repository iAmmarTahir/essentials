import React, { useState, Fragment } from 'react';
import Axios from 'axios';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import {
    makeStyles
} from '@material-ui/core/styles'

const useStyles = makeStyles({
    card: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },
    text: {
        marginTop: 5,
        marginBottom: 5
    },
    main: {
        maxWidth: 1000
    }
})

function OrderRecieved(props) {
    const classes = useStyles();

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
            }, 3000)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
      <div style={{ marginTop: "100px" }} className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div style={{ textAlign: "center" }} className="col-md-6">
            {recieve ? (
              <Fragment>
                <Typography variant="h2" color="primary">
                  {recieve}
                </Typography>
                <Typography className={classes.text} variant="body2">
                  It will redirect automatically...
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.text}
                      variant="h4"
                      color="primary"
                    >
                      Your order is on your way...
                    </Typography>
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="inherit"
                    >
                      Let us know when you recieve it
                    </Typography>
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="inherit"
                    >
                      Make the payment to the Delievery Man
                    </Typography>
                  </CardContent>
                  <Button color="primary" onClick={handleRecieved}>
                    Recieved
                  </Button>
                </Card>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
}

export default OrderRecieved;