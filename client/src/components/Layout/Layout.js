import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Layout = props => (
  <div>
    <nav className="navbar navbar-dark bg-primary navbar-fixed-top">
      <Link to="/" className="navbar-brand">Konquest</Link>
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <Link to="/" className="nav-link" activeClassName="active">
            Home
            <span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
      <ul className="nav navbar-nav float-xs-right">
        <li className="nav-item">
          <Link to="/users/login" className="nav-link" activeClassName="active">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users/login" className="nav-link" activeClassName="active">
            Register
          </Link>
        </li>
      </ul>
    </nav>
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
