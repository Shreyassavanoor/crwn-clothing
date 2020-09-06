import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import  { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemsCount }) => {
    return (
        <div className="cart-icon" onClick={() => toggleCartHidden()}>
            <ShoppingIcon className="shopping-icon"></ShoppingIcon>
            <span className="item-count">{itemsCount}</span>
        </div>
    )
};

const mapdispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapPropsToState = (state) => ({
    itemsCount: state.cart.cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
});

export default connect(mapPropsToState, mapdispatchToProps)(CartIcon);