import React, { useContext } from 'react'
import { createContext } from 'react'
import { faker } from '@faker-js/faker';
import { useReducer } from 'react';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();
faker.seed(999);

const Context = ({ children }) => {

    const products = [...Array(50)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: `${faker.image.fashion()}?random=${Math.round(Math.random() * 1000)}`,
        inStock: faker.random.numeric() - 1,
        fastDelivery: faker.datatype.boolean(),
        ratings: Math.ceil(faker.random.numeric() / 2)
    }));

    const [state, dispatch] = useReducer(cartReducer, {
        products,
        cart: []
    })

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    })

    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(Cart);
}