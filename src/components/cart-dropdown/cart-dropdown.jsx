import React from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component'
import {connect} from 'react-redux'
import { selectCartItems } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems,history,dispatch}) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                { cartItems.length ?
                    cartItems.map(cartItem=>(
                    <CartItem key={cartItem.id} item={cartItem} />
                )) : 
                (
                    <span className='empty-message'>Your cart is Empty</span>
                ) }
            </div>
            <Button onClick={()=>{
                history.push('/checkout')
                dispatch(toggleCartHidden())
            }}> Go To Checkout </Button>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     cartItems : selectCartItems(state)
// }) 
const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));