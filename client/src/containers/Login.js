import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Row, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';

import { autheticateUser } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // input references
    this.passwordInput = null;
    this.usernameInput = null;
    // bindings
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const { dispatch } = this.props;

    const credentials = {
      password: this.passwordInput.value,
      username: this.usernameInput.value,
    };

    dispatch(autheticateUser(credentials));
  }

  render() {
    return (
      <div>
        <PageHeader>
          Sign in
        </PageHeader>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="username"
                    type="username"
                    placeholder="Email"
                    inputRef={(ref) => { this.usernameInput = ref; }}
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
                    placeholder="Password"
                    inputRef={(ref) => { this.passwordInput = ref; }}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button onClick={this.submitForm}>
                    Sign in
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
  dispatch: PropTypes.func,
};

const ConnectedLogin = connect()(Login);

export default ConnectedLogin;
