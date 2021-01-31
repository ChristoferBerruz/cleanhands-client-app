import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {

    return(
        <Navbar bg="dark" expand="sm">
            <Navbar.Brand>
                Clean Hands
            </Navbar.Brand>
        </Navbar>
    )
}

export default Header;