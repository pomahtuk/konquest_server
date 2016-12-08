import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GameField from '../components/GameField';
import GameOptions from '../components/GameOptions';
import { getDemoGameField } from '../actions/game';

class GameFieldContainer extends Component {
  constructor(props) {
    super(props);

    this.generateGameField = this.generateGameField.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDemoGameField({
      width: 10,
      height: 12,
      players: 2,
      planetCount: 5,
    }));
  }

  generateGameField(params) {
    const { dispatch } = this.props;
    dispatch(getDemoGameField(params));
  }

  render() {
    const { isLoading, settings } = this.props;

    if (isLoading) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <div>
        <GameField {...this.props} />

        <GameOptions onGenerate={this.generateGameField} {...settings} />
      </div>
    );
  }
}

GameFieldContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
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
