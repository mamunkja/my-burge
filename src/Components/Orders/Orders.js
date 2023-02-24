import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import Spinner from "../Spinner/Spinner";
import Order from "./Order";

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        ordersLoading: state.ordersLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders;
        if (this.props.orderErr) {
            orders = (<p style={{
                border: "1px solid grey",
                borderRadius: "5px",
                padding: "10px",
                marginRight: "10px",
            }}> Sorry Failed to load Orders!</p>);
        } else {
            if (this.props.orders.length === 0) {
                orders = (<p style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "10px",
                    marginRight: "10px",
                }}> You have no order!</p>);
            } else {
                orders = this.props.orders.map(order => {
                    return (
                        <Order order={order} key={order.id} />
                    )
                })
            }
        }

        return (
            <div>
                {this.props.ordersLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);