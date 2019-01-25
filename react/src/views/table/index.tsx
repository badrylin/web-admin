import React, { Component } from 'react';
import SvgIcon from '../../components/SvgIcon';

export default class TablePage extends Component {
  render() {
    return (
      <div>
        Table
        <SvgIcon name='eye' ></SvgIcon>
        {this.props.children}
      </div>
    );
  }
}
