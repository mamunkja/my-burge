import React from "react";

const Order = props => {
    let ingredients = props.order.ingredients.map(item => {
        return (
            <span
                key={item.type}
                style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "wheat",
                }}
            >{item.amount} X <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
        )
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
        }} >
            <p>Order Number: {props.order.id} </p>
            <p>Delivery Addres: {props.order.customer.deliveryAddress} </p>
            <hr />
            {ingredients}
            <hr />
            <p>Total Price: {props.order.price} BDT</p>
        </div>
    )
}

export default Order;