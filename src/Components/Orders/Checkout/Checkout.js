import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: ""
    }

    goBack = () => {
        this.props.navigate("/");
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: Date(),
            userId: this.props.userId
        };
        axios.post("https://burger-builder-db949-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
            .then(response => {
                //console.log(response);
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully"
                    });
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went wrong! Order Again!"
                    });
                }

            })
            .catch(error => {
                //console.log(error);
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went wrong!" + error.message
                });
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                backgroundColor: "wheat"
            }}>Price: {this.props.totalPrice} BDT</h4>
            <form style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress}
                    className="form-control" placeholder="Your Address"
                    onChange={(e) => this.inputChangeHandler(e)}></textarea>
                <br />
                <input name="phone" className="form-control"
                    value={this.state.values.phone} placeholder="Your Phone"
                    onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType}
                    onChange={(e) => this.inputChangeHandler(e)}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <Button style={{ backgroundColor: "#D70F64" }}
                    className="mr-auto mt-2" onClick={this.handleSubmit}
                    disabled={!this.props.purchasable} >Place Order</Button>
                <Button color="secondary" className="mt-2 ml-1"
                    onClick={this.goBack}>Cancel</Button>
            </form>
        </div>);
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Checkout {...props} navigate={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);