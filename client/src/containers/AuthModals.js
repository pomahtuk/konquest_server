import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { clearAuthError } from '../actions/auth';

class AuthModals extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { dispatch } = this.props;
    dispatch(clearAuthError());
  }

  render() {
    const { error } = this.props.auth;

    return (error &&
      <Modal
        show={!!error}
        dialogClassName="custom-modal"
        onHide={this.onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {error.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error.status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AuthModals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object,
    isInProgress: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
)(AuthModals);
