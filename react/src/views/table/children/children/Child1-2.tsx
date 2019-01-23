import React, { Component } from 'react';

interface IState {
  num: number;
}
export default class Child12 extends Component<{}, IState> {
  state: Readonly<IState> = {
    num: 1,
  };
  handleClick = () => {
    const num: number = this.state.num + 1;
    this.setState({
      num,
    });
  }
  render() {
    return (
      <div>
        Child1-2
        <button onClick={this.handleClick}>{this.state.num}</button>
      </div>
    );
  }
}
