import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = ({ authState }) => {
  const { user, isInProgress } = authState;

  return (
    <Navbar fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">Konquest</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
        </Nav>
        { !user && !isInProgress &&
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem>Sign in</NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem>Sign up</NavItem>
            </LinkContainer>
          </Nav>
        }
        { !user && isInProgress &&
          <Navbar.Text pullRight>
            Authenticating...
          </Navbar.Text>
        }
        { user &&
          <div>
            <Navbar.Text pullRight>
              {user.username}
            </Navbar.Text>
            <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer>
          </div>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  authState: PropTypes.shape({
    user: PropTypes.object,
    isInProgress: PropTypes.bool,
  })
};

export default AppNavbar;
