import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GameField from '../components/GameField';
import { getDemoGameField } from '../actions/game';

class GameFieldContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDemoGameField({
      width: 10,
      height: 10,
      players: 2,
      planetCount: 5,
    }));
  }

  generateGameField(params) {
    const { dispatch } = this.props;
    dispatch(getDemoGameField(params));
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <div>
        <GameField {...this.props} />

        {/* <GameOptions onGenerate={this.generateGameField.bind(this)}/> */}
      </div>
    );
  }
}

GameFieldContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { game: { settings, planets, isLoading } } = state;
  return {
    settings,
    planets,
    isLoading,
  };
};

const ConnectedGameField = connect(
  mapStateToProps
)(GameFieldContainer);

export default ConnectedGameField;
