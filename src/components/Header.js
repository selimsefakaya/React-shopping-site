import React from 'react'
import { Navbar, Container, FormControl, Nav, Dropdown, Badge, Button } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { AiFillDelete } from 'react-icons/ai';
import { BsCartFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import * as actionTypes from "../context/actionTypes"

const Header = () => {

    const {
        state: { cart },
        dispatch,
        productDispatch
    } = CartState();

    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }} >
            <Container>
                <Navbar.Brand>
                    <Link to="/">Shopping</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl
                        style={{ width: 500 }}
                        placeholder="Search a product"
                        className="m-auto"
                        onChange={(e) => {
                            productDispatch({
                                type: actionTypes.FILTER_BY_SEARCH,
                                payload: e.target.value
                            })
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown align="end">
                        <DropdownToggle variant="success">
                            <BsCartFill color="white" fontSize="25px" />
                            <Badge bg="success">{cart.length}</Badge>
                        </DropdownToggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {
                                cart.length > 0 ? (
                                    <>
                                        {
                                            cart.map(product => (
                                                <span className="cart-item" key={product.id}>
                                                    <img
                                                        src={product.image}
                                                        className="cart-item-img"
                                                        alt={product.name}
                                                    />
                                                    <div className="cart-item-detail">
                                                        <span>{product.name}</span>
                                                        <span>₺ {product.price}</span>
                                                    </div>
                                                    <AiFillDelete
                                                        fontSize="20px"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => dispatch({
                                                            type: actionTypes.REMOVE_FROM_CART,
                                                            payload: product
                                                        })}
                                                    />
                                                </span>
                                            ))}
                                        <Link to="cart">
                                            <Button style={{ width: "95%", margin: "0 10px" }}>
                                                Go To Cart
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default Header