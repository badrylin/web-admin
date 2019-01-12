import React from 'react';

export default class Layout extends React.Component<{}, {}> {
  render() {
    return(
      <div>
        Layout
        {this.props.children}
      </div>
    );
  }
}
