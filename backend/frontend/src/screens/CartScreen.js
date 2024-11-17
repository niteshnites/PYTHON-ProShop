import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

export function CartScreen() {
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const quantity = location.search ? Number(new URLSearchParams(location.search).get('quantity')) : 1;

    const dispatch = useDispatch();
    
    const { cartItems } = useSelector(({ cart }) => cart);
    const { userInfo: user } = useSelector(({ userLogin }) => userLogin);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (user) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={`Image of ${item.name}`} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.quantity}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {[...Array(item.countInStock > 0 ? item.countInStock : 1).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>

                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4} className="py-3">
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button
                                type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
