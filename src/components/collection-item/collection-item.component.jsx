import React from 'react';
import { connect } from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions'
import './collection-item.styles.scss';
import Button from '../button/button.component';

const CollectionItem = ({item, addItem}) =>{
    const {price,imageUrl,name} = item;
    return (
    <div className='collection-item'>
        <div 
        className='image'
        style={{
            backgroundImage:`url(${imageUrl})`
        }}
        />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button onClick={()=>addItem(item)} inverted> Add to Cart </Button>
    </div>
)
    }

const mapDispatchToProps = dispatch => ({
    addItem : (item) => dispatch(addItem(item))
})


export default connect(null,mapDispatchToProps)(CollectionItem);