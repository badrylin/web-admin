import React, { Component } from 'react';

export default class Child1 extends Component {
  render() {
    return (
      <div>
        Child1
        {this.props.children}
      </div>
    );
  }
}
