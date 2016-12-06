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
    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.onFieldChanged = this.onFieldChanged.bind(this);
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

  componentWillUpdate(nextProps, nextState) {
    const { router: { push } } = nextProps;
    if (nextState.userCreated) {
      push('/');
    }
  }

  onFieldChanged(event) {
    const { name, value } = event.target;
    const shouldValidate = this.state[name].shouldValidate;
    this.setState({
      [name]: {
        value,
        shouldValidate
      }
    });
  }

  onFieldBlur(event) {
    const { name } = event.target;

    if (!name) {
      return false;
    }

    const value = this.state[name].value;
    return this.setState({
      [name]: {
        shouldValidate: true,
        value,
      }
    });
  }

  getConfirmationValidationState(force = false) {
    const { password: passObj, confirmation: confObj } = this.state;
    let valudationResult = null;

    if (!(passObj.shouldValidate && confObj.shouldValidate) && !force) {
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

  getUsernameValidationState(force = false) {
    const { username: unameObj } = this.state;
    let valudationResult = null;

    if (!unameObj.shouldValidate && !force) {
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

  getPasswordValidationState(force = false) {
    const { password: passObj } = this.state;
    let valudationResult = null;

    if (!passObj.shouldValidate && !force) {
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

  submitForm() {
    const { dispatch } = this.props;
    const { password: passObj, username: unameObj } = this.state;
    const confirmationValidationState = this.getConfirmationValidationState(true);
    const usernameValidationState = this.getUsernameValidationState(true);
    const passwordValidationState = this.getPasswordValidationState(true);

    // TODO: explicit error messages

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
      password: passObj.value,
      username: unameObj.value,
    };

    return dispatch(createUser(credentials))
      .then(() => this.setState({ userCreated: true }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { confirmation, username, password } = this.state;
    const { isAuthInProgress } = this.props;

    return (
      <div>
        <PageHeader>
          Sign up
        </PageHeader>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <Form
              horizontal
              onChange={this.onFieldChanged}
              onSubmit={this.onSubmit}
              onBlur={this.onFieldBlur}
              className={isAuthInProgress ? 'disabled' : ''}
            >
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
                    type="email"
                    placeholder="Email"
                    value={username.value}
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
                    name="confirmation"
                    type="password"
                    placeholder="Password confirmation"
                    value={confirmation.value}
                  />
                  <FormControl.Feedback />
                  {this.getConfirmationValidationState() === 'error' &&
                    <HelpBlock>Confirmation must match password.</HelpBlock>
                  }
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button disabled={isAuthInProgress} onClick={this.submitForm}>
                    {isAuthInProgress ? 'Signing...' : 'Sign up'}
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
  isAuthInProgress: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(state => ({ isAuthInProgress: state.auth.isInProgress }))(Register);
