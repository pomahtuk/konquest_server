import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Row, PageHeader, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createUser } from '../actions/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    // input references
    this.passwordInput = null;
    this.passwordConfirmInput = null;
    this.usernameInput = null;
    // bindings
    this.submitForm = this.submitForm.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getConfirmationValidationState = this.getConfirmationValidationState.bind(this);
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    // state
    this.state = {
      username: {
        value: '',
        shouldValidate: false,
      },
      confirmation: {
        value: '',
        shouldValidate: false,
      },
      password: {
        value: '',
        shouldValidate: false,
      },
    };
  }

  getConfirmationValidationState() {
    const { password: passObj, confirmation: confObj } = this.state;
    let valudationResult = null;

    if (!(passObj.shouldValidate && confObj.shouldValidate)) {
      return valudationResult;
    }

    const password = passObj.value;
    const confirmation = confObj.value;

    if ((password && confirmation) && password !== confirmation) {
      valudationResult = 'error';
    }

    if (password && confirmation && (password === confirmation)) {
      valudationResult = 'success';
    }

    return valudationResult;
  }

  getUsernameValidationState() {
    const { username: unameObj } = this.state;
    let valudationResult = null;

    if (!unameObj.shouldValidate) {
      return valudationResult;
    }

    const username = unameObj.value;

    // if length is less than 3 or no @ symbol in username
    if (username && (username.length < 3 || username.indexOf('@') === -1)) {
      valudationResult = 'error';
    }

    if (username && username.length >= 3 && username.indexOf('@') !== -1) {
      valudationResult = 'success';
    }

    return valudationResult;
  }

  getPasswordValidationState() {
    const { password: passObj } = this.state;
    let valudationResult = null;

    if (!passObj.shouldValidate) {
      return valudationResult;
    }

    const password = passObj.value;

    // if length is less than 3 or no @ symbol in username
    if (password && password.length < 3) {
      valudationResult = 'error';
    }

    if (password && password.length >= 3) {
      valudationResult = 'success';
    }

    return valudationResult;
  }

  handleBlur(type) {
    const value = this.state[type].value;
    this.setState({
      [type]: {
        shouldValidate: true,
        value,
      }
    });
  }

  handleChange(type, event) {
    const shouldValidate = this.state[type].shouldValidate;
    this.setState({
      [type]: {
        value: event.target.value,
        shouldValidate,
      }
    });
  }

  submitForm() {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    const confirmationValidationState = this.getConfirmationValidationState();
    const usernameValidationState = this.getUsernameValidationState();
    const passwordValidationState = this.getPasswordValidationState();

    // TODO:  explicive error messages

    if (confirmationValidationState !== 'success') {
      return false;
    }

    if (usernameValidationState !== 'success') {
      return false;
    }

    if (passwordValidationState !== 'success') {
      return false;
    }

    const credentials = {
      password,
      username,
    };

    return dispatch(createUser(credentials));
  }

  render() {
    const { confirmation, username, password } = this.state;
    return (
      <div>
        <PageHeader>
          Sign up
        </PageHeader>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              <FormGroup
                controlId="formHorizontalEmail"
                validationState={this.getUsernameValidationState()}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="username"
                    type="username"
                    placeholder="Email"
                    value={username.value}
                    onChange={event => this.handleChange('username', event)}
                    onBlur={() => this.handleBlur('username')}
                  />
                  <FormControl.Feedback />
                  {this.getUsernameValidationState() === 'error' &&
                    <HelpBlock>Username must be at lest 3 characters long and contain @ symbol.</HelpBlock>
                  }
                </Col>
              </FormGroup>

              <FormGroup
                controlId="formHorizontalPassword"
                validationState={this.getPasswordValidationState()}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password.value}
                    onChange={event => this.handleChange('password', event)}
                    onBlur={() => this.handleBlur('password')}
                  />
                  <FormControl.Feedback />
                  {this.getPasswordValidationState() === 'error' &&
                    <HelpBlock>Password must be at lest 3 characters long.</HelpBlock>
                  }
                </Col>
              </FormGroup>

              <FormGroup
                controlId="formHorizontalPasswordConfirm"
                validationState={this.getConfirmationValidationState()}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Confirmation
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="confirm"
                    type="password"
                    placeholder="Password confirmation"
                    value={confirmation.value}
                    onChange={event => this.handleChange('confirmation', event)}
                    onBlur={() => this.handleBlur('confirmation')}
                  />
                  <FormControl.Feedback />
                  {this.getConfirmationValidationState() === 'error' &&
                    <HelpBlock>Confirmation must match password.</HelpBlock>
                  }
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button onClick={this.submitForm}>
                    Sign up
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

Register.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Register);
