import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = ({ authState, logoutCallback }) => {
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
          <LinkContainer to="/game">
            <NavItem>Game</NavItem>
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
          <Nav pullRight>
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <MenuItem>Game</MenuItem>
              <MenuItem divider />
              <LinkContainer to="/">
                <MenuItem onClick={logoutCallback}>Logout</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  logoutCallback: PropTypes.func,
  authState: PropTypes.shape({
    user: PropTypes.object,
    isInProgress: PropTypes.bool,
  })
};

export default AppNavbar;
