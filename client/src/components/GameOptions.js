import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class GameOptions extends Component {
  constructor(props) {
    super(props);

    const { width, height, players, planetCount } = this.props;

    this.state = {
      width,
      height,
      players,
      planetCount
    };

    this.onFieldChanged = this.onFieldChanged.bind(this);
  }

  onFieldChanged(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { state: { width, height, players, planetCount }, props: { onGenerate } } = this;

    return (
      <div>
        <Form horizontal onChange={this.onFieldChanged}>
          <FormGroup>
            <ControlLabel>
              Width:
            </ControlLabel>
            <FormControl value={width} name="width" type="number" min="0" max="20" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Height:
            </ControlLabel>
            <FormControl value={height} name="height" type="number" min="0" max="20" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Players:
            </ControlLabel>
            <FormControl value={players} name="players" type="number" min="2" max="4" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Free planet count:
            </ControlLabel>
            <FormControl value={planetCount} name="planetCount" type="number" min="1" />
          </FormGroup>
          <Button onClick={() => onGenerate(this.state)}>
            Generate!
          </Button>
        </Form>
      </div>
    );
  }
}

GameOptions.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  players: PropTypes.number,
  planetCount: PropTypes.number,
};

export default GameOptions;
