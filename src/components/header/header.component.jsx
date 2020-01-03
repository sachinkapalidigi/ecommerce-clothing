import React from 'react';

import {Link} from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/crown.svg'

import { auth } from "../../firebase/firebase.utils";

import './header.styles.scss';

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';

const Header = ({ currentUser , hidden}) => {

    return (
        <div className='header'>
            <Link to='/'>
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={()=>auth.signOut()}>Sign Out</div>
                    : 
                    <Link className='option' to='/signin'>
                        Sign In
                    </Link>
                }
                <CartIcon />
            </div>
            {hidden?null:(<CartDropdown />)}
        </div>
    )

}

// const mapStateToProps = ({user : {currentUser} , cart : {hidden}}) => ({
//     currentUser,
//     hidden
// })

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
})


export default connect(mapStateToProps)(Header);