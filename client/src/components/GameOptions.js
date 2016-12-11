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
      [name]: Number(value),
    });
  }

  render() {
    const { state: { width, height, players, planetCount }, props: { onGenerate } } = this;

    return (
      <div>
        <Form horizontal>
          <FormGroup>
            <ControlLabel>
              Width:
            </ControlLabel>
            <FormControl
              value={width}
              name="width"
              type="number"
              min="0"
              max="20"
              onChange={this.onFieldChanged}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Height:
            </ControlLabel>
            <FormControl
              value={height}
              name="height"
              type="number"
              min="0"
              max="20"
              onChange={this.onFieldChanged}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Players:
            </ControlLabel>
            <FormControl
              value={players}
              name="players"
              type="number"
              min="2"
              max="4"
              onChange={this.onFieldChanged}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Free planet count:
            </ControlLabel>
            <FormControl
              value={planetCount}
              name="planetCount"
              type="number"
              min="1"
              onChange={this.onFieldChanged}
            />
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
