import React from 'react';
import './index.scss';

interface IProps {
  name: string;
  className?: string;
}
export default class SvgIcon extends React.PureComponent<IProps> {
  render() {
    const {name, className = ''} = this.props;
    return (
      <svg className={`svg-icon ${className}`}>
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
    );
  }
}
