import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate(location.pathname);
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Group className='d-flex'> {/* Use d-flex to create a flex container */}
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-2' // Margin right for spacing
                    placeholder='Search...' // Optional plChangeder for better UX
                />
                <Button
                    type='submit'
                    variant='outline-success'
                    className='p-2'
                >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default SearchBox;
