import React, { Component } from 'react';

export default class Submit extends Component {
  state = {
    disabled: true,
  }

  onChange = (e) => {
    const length = e.target.value.length;
    if (length >= 4) {
      this.setState({ disabled: false })
    } else if (!this.state.disabled) {
      this.setState({ disabled: true })
    }
  }

  render() {
    const label = this.state.disabled ? 'Disabled' : 'Submit';
    const { disabled } = this.state;
    return (
      <div className="App">
        <button
          style={Object.assign({}, styles.button, !disabled && styles.buttonEnabled)}
          disabled={disabled}
        >{label}</button>
        <input
          style={styles.input}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  input: {
    width: 200,
    height: 30,
    outline: 'none',
    fontSize: 20,
    padding: 10,
    border: 'none',
    backgroundColor: '#ebeceb',
    marginLeft: 10,
    borderRadius: 4,
  },
  button: {
    width: 100,
    height: 50,
    border: 'none',
    borderRadius: 4,
    fontSize: 20,
    cursor: 'pointer',
    transition: '.25s all',
  },
  buttonEnabled: {
    backgroundColor: '#ffc107',
    width: 100,
  }
}