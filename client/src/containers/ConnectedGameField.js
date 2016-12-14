import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GameField from '../components/GameField';
import GameOptions from '../components/GameOptions';
import GameTurnDetails from '../components/GameTurnDetails';
import { getDemoGameField, togglePlanetState } from '../actions/game';

class GameFieldContainer extends Component {
  constructor(props) {
    super(props);

    this.generateGameField = this.generateGameField.bind(this);
    this.onPlanetClick = this.onPlanetClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDemoGameField({
      width: 8,
      height: 12,
      players: 2,
      planetCount: 10,
    }));
  }

  onPlanetClick(planetIndex) {
    const { dispatch } = this.props;
    dispatch(togglePlanetState(planetIndex));
  }

  generateGameField(params) {
    const { dispatch } = this.props;
    dispatch(getDemoGameField(params));
  }

  render() {
    const { isLoading, settings, selectedPlanets } = this.props;

    if (isLoading) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <div>
        <GameField {...this.props} onPlanetClick={this.onPlanetClick} />

        <GameTurnDetails selectedPlanets={selectedPlanets} />

        <GameOptions onGenerate={this.generateGameField} {...settings} />
      </div>
    );
  }
}

GameFieldContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  selectedPlanets: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { game: { settings, planets, selectedPlanets, isLoading } } = state;
  return {
    settings,
    planets,
    selectedPlanets,
    isLoading,
  };
};

const ConnectedGameField = connect(
  mapStateToProps
)(GameFieldContainer);

export default ConnectedGameField;
