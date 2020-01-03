import React from 'react';
import './cart-item.styles.scss'

const CartItem = ({item:{name,imageUrl,price,quantity}}) =>(
    <div className='cart-item'>
        <img src={imageUrl} alt="cart-item"/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>
                {price * quantity}
            </span>
        </div>
    </div>
)

export default CartItem;