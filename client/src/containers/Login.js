import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Row, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';

import { autheticateUser } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // input references
    this.state = {
      username: '',
      password: '',
    };
    // bindings
    this.submitForm = this.submitForm.bind(this);
    this.onFieldChanged = this.onFieldChanged.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const { router: { push } } = nextProps;
    if (nextState.userLoggedIn) {
      push('/');
    }
  }

  onFieldChanged(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  submitForm() {
    const { dispatch } = this.props;
    const { username, password } = this.state;

    const credentials = {
      password,
      username,
    };

    dispatch(autheticateUser(credentials))
      .then(() => this.setState({ userLoggedIn: true }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { isAuthInProgress } = this.props;
    const { username, password } = this.state;

    return (
      <div>
        <PageHeader>
          Sign in
        </PageHeader>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <Form horizontal onChange={this.onFieldChanged}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="username"
                    type="username"
                    value={username}
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button disabled={isAuthInProgress} onClick={this.submitForm}>
                    {isAuthInProgress ? 'Signing...' : 'Sign in'}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthInProgress: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(state => ({ isAuthInProgress: state.auth.isInProgress }))(Login);
