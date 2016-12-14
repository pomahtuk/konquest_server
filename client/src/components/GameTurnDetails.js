import React, { PropTypes } from 'react';

const GameTurnDetails = (props) => {
  const { selectedPlanets } = props;

  return (
    <div>
      {selectedPlanets.size}
    </div>
  );
};

GameTurnDetails.propTypes = {
  selectedPlanets: PropTypes.object.isRequired,
};

export default GameTurnDetails;
