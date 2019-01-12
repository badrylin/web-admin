import React, { Component } from 'react';

export default class TablePage extends Component {
  render() {
    return (
      <div>
        Table
        {this.props.children}
      </div>
    );
  }
}
